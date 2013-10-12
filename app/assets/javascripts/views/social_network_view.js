App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this,
        canvas = d3.select("#graph_canvas"),
        $canvas = $("#graph_canvas");
    this.root = canvas.append("g").attr("class", "root");
    var socialNetwork = this.socialNetwork = this.get('controller.content');
    this.tick();
    $canvas.on('canvasUpdate', function() { view.tick(); })

    // tooltip definitions
    this.$('.states .btn').tooltip();
    this.$('.operations .edit').tooltip();
    this.$('.zoom-buttons .btn').tooltip();

    // zoom buttons calls
    this.$('.zoom-buttons .zoom-in').on('click', function() {
      scale = Math.min(socialNetwork.get('scale') + 0.2, 2);
      view.zoomTo(scale);
    });
    this.$('.zoom-buttons .zoom-out').on('click', function() {
      scale = Math.max(socialNetwork.get('scale') - 0.2, 0.4);
      view.zoomTo(scale);
    });
    this.$('.zoom-buttons .zoom-reset').on('click', function() { view.zoomTo(1); });
    $canvas.on('sortNodes', function() { view.initForce(); });
  },

  // zoom buttons execution
  zoomTo: function(scale) {
    var transaction = this.socialNetwork.get('store').transaction();
    transaction.add(this.socialNetwork);
    this.socialNetwork.set('scale', scale);
    this.tick();
    transaction.commit();
  },

  tick: function() {
    this.root.attr(
      "transform",
      "translate("+this.socialNetwork.get('translation')+") " +
      "scale("+this.socialNetwork.get('scale')+")"
    );
  },

  selectModeButton: function() {
    buttonClass = "." + this.get('controller.currentMode').toLowerCase();
    // fix the active button if the value was change inside the app
    if(!$(".states "+buttonClass).hasClass("active")) {
      $(".states .btn").removeClass("active");
      $(".states "+buttonClass).addClass("active");
    }
  }.observes('controller.currentMode'),

  initForce: function() {
    // nodes
      //index - the zero-based index of the node within the nodes array.
      //x - the x-coordinate of the current node position.
      //y - the y-coordinate of the current node position.
      //px - the x-coordinate of the previous node position.
      //py - the y-coordinate of the previous node position.
      //fixed - a boolean indicating whether node position is locked.
      //weight - the node weight; the number of associated links.
    var i = 0;
    // store node object index into nodes data array in order
    // to later construct the links data array
    var node_indexes = [];
    var nodes = this.get('socialNetwork.nodes').toArray().map(function(node) { 
      var data = {
        x: node.get('cx')
      , y: node.get('cy')
      , weight: node.get('roles.length')
      , id: node.get('id')
      }
      node_indexes[node.get('id')] = i++;
      return data;
    });
    // links
      // source - the source node (an element in nodes).
      // target - the target node (an element in nodes).
    var links = this.get('socialNetwork.roles').toArray().map(function(role) {
      var data = {
        source: node_indexes[role.get('actor.id')]
      , target: node_indexes[role.get('relation.id')]
      };
      return data;
    });

    var w = 1400,
        h = 700,
        iterations = 30,
        linkDistance = 80;

    var force = d3.layout.force()
                  .nodes(nodes)
                  .links(links)
                  .size([w, h])
                  .charge(-500)
                  .linkDistance(linkDistance)
                  //.on('tick', this.forceTick);

    this.set('force', force);
    
    force.start();
    for (var i = 0; i < iterations; ++i) {
      force.tick();
    }
    force.stop();
    this.updateNodes(nodes);
    $("#graph_canvas").trigger('customTick');
  },

  updateNodes: function(nodes) {
    nodes.forEach(function(node_data){
      node = App.Node.find(node_data['id']);
      node.set('x', node_data['x']);
      node.set('y', node_data['y']);
    });
  },

});
