App.NodesView = Ember.View.extend({
  templateName: 'nodes',

  didInsertElement: function () {
    view = this;
    $graphCanvas = $("#graph_canvas");
    this.socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    $graphCanvas.on('click', this.addNode());
    this.get('controller.content').on('didLoad', function () { view.renderSVG(); });
    $graphCanvas.on('nodeUpdate', function () { view.tick(); });
  },

  renderSVG: function () {
    console.log("insert svg content");
    this.svg = d3.select("#graph_canvas .root");
    this.renderActorsSVG();
    this.renderRelationsSVG();
  }.observes('controller.length'),

  renderActorsSVG: function() {
    data = this.get('controller.content').toArray().filter(function(node){
      return node.get('kind') == "Actor";
    });
    // set the text element to handle
    this.actorText   = this.svg.selectAll("text.actor").data(data);
    this.actorCircle = this.svg.selectAll("circle.actor").data(data);

    // enter state: append text
    this.actorText.enter().append("text")
      .attr("class", "actor")
      .attr("text-anchor", "middle")
      .attr("data-selected", false)
      .call(this.draggableNode())
      .on('click', this.nodeClick());
    this.actorCircle.enter().append("circle")
      .attr("r", function(d) { return d.get('radius'); })
      .attr("class", "actor")
      .call(this.draggableNode())
      .on('click', this.nodeClick());
    this.tickActors();
    // exit state: remove unused text
    this.actorText.exit().remove();
    this.actorCircle.exit().remove();
  },

  renderRelationsSVG: function() {
    data = this.get('controller.content').toArray().filter(function(node){
      return node.get('kind') == "Relation";
    });
    // set the text element to handle
    this.relationText = this.svg.selectAll("text.relation").data(data);
    this.relationRect = this.svg.selectAll("rect.relation").data(data);

    // enter state: append text
    this.relationText.enter().append("text")
      .attr("class", "relation")
      .attr("text-anchor", "middle")
      .attr("data-selected", false)
      .call(this.draggableNode())
      .on('click', this.nodeClick());
    this.relationRect.enter().append("rect")
      .attr("width", function(d) { return d.get('radius'); })
      .attr("height", function(d) { return d.get('radius'); })
      .attr("class", "relation")
      .call(this.draggableNode())
      .on('click', this.nodeClick());
    this.tickRelations();
    // exit state: remove unused text
    this.relationText.exit().remove();
    this.relationRect.exit().remove();
  },

  tick: function () {
    this.tickActors();
    this.tickRelations();
  }.observes('controller.@each.name'),

  tickActors: function() {
    // update state: update text content and coordinates
    this.actorText
      .text(function(d){ return d.get('name'); })
      .attr("x", function(d) { return d.get('text_x') })
      .attr("y", function(d) { return d.get('text_y') });

    this.actorCircle
      .attr('cx', function(d) { return d.get('cx'); })
      .attr('cy', function(d) { return d.get('cy'); })
      .attr('fill', function (d) {
        if (d.get('family.color')) {
          return d.get('family.color');
        }
      });
  },

  tickRelations: function() {
    this.relationText
      .text(function(d) { return d.get('name'); })
      .attr("x", function(d) { return d.get('text_x') })
      .attr("y", function(d) { return d.get('text_y') - 7 });

    this.relationRect
      .attr('x', function(d) { return d.get('x') - d.get('radius')/2; })
      .attr('y', function(d) { return d.get('y') + d.get('radius')/2; })
      .attr('fill', function (d) {
        if (d.get('family.color')) {
          return d.get('family.color');
        }
      });
    
  },

  addNode: function() {
    view = this;
    return function (event) {
      enabled = view.get('socialNetwork.currentMode') == "Actor" ||
                view.get('socialNetwork.currentMode') == "Relation";
      if(enabled) {
        console.log("click: add node");
        var offset = $(this).offset(); 

        kind = view.get('socialNetwork.currentMode');

        // TODO: manage the scaling case in position when adding new actor
        var coords = {
          x: (event.pageX - offset.left),
          y: (event.pageY - offset.top - 20),
        }
        view.controller.send('add', kind, coords.x, coords.y);
      };
    }
  },

  draggableNode: function() {  
    view = this;
    return d3.behavior.drag()
    .on('dragstart', function (d) {
      // store initial position of the node
      if (view.get('socialNetwork.currentMode') == "Hand") {
        d.__init__ = { x: d.get('x'), y: d.get('y') }
      }
    })
    .on('drag', function (d) {
      if (view.get('socialNetwork.currentMode') == "Hand") {
        // move the coordinates of the node
        d.set('x', d.get('x') + d3.event.dx);  
        d.set('y', d.get('y') + d3.event.dy);  
        view.tick();
      }
    })
    .on('dragend', function (d) {
      if (view.get('socialNetwork.currentMode') == "Hand") {
        // store changes only if node was really translated
        if (d.__init__.x != d.get('x') && d.__init__y != d.get('y')) {
          // update position changes to the server
          if(!d.get('isNew')) {
            d.get('store').commit();
          };
        }
        delete d.__init__;
      }
    });
  },

  nodeClick: function() {
    view = this;
    return function (d) {
      d3.event.stopPropagation();
      console.log("node clicked "+d.get('name'));
      // set the controller current node to this node
      view.set('controller.currentNode', d);
      // remove current new node
      view.get('controller').send('clearCurrentNewNode');
    };
  }

});
