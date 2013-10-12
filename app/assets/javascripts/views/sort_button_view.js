App.SortButtonView = Ember.View.extend({

  didInsertElement: function() {
    this.set('socialNetwork', this.get('controller.content'));
    this.set('width', 1400);
    this.set('height', 700);
    this.set('node_indexes', []);
  },

  initForce: function() {
    var nodes = this.initNodes(),
        links = this.initLinks();
    var force = d3.layout.force()
                  .nodes(nodes)
                  .links(links)
                  .size([this.get('width'), this.get('height')])
                  .charge(-500)
                  .linkDistance(80);
    this.set('force', force);
  },

  initNodes: function() {
    var i = 0,
        node_indexes = this.get('node_indexes');
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
    this.set('nodes', nodes);
    return nodes;
  },

  initLinks: function() {
    var node_indexes = this.get('node_indexes');
    var links = this.get('socialNetwork.roles').toArray().map(function(role) {
      var data = {
        source: node_indexes[role.get('actor.id')]
      , target: node_indexes[role.get('relation.id')]
      };
      return data;
    });
    this.set('links', links);
    return links;
  },

  sort: function() {
    $("body").addClass("loading");
    console.log("sorting all nodes...");
    this.initForce();
    var force = this.get('force');
    force.start();
    for (var i = 0; i < 30; ++i) { force.tick(); }
    force.stop();
    this.updateNodes();
    $("#graph_canvas").trigger('forceTick');
    $("body").removeClass("loading");
  },

  updateNodes: function() {
    var transaction = this.get('socialNetwork.store').transaction();
    this.get('nodes').forEach(function(node_data){
      node = App.Node.find(node_data['id']);
      transaction.add(node);
      node.set('x', node_data['x']);
      node.set('y', node_data['y']);
    });
    transaction.commit();
  },

});
