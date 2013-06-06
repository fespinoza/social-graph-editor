App.NodesView = Ember.View.extend({
  templateName: 'nodes',

  didInsertElement: function () {
    view = this;
    $graphCanvas = $("#graph_canvas");
    this.socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    $graphCanvas.on('click', this.addActor());
    this.get('controller.content').on('didLoad', function () { view.renderSVG(); });
    $graphCanvas.on('nodeUpdate', function () { view.tick(); });
  },

  renderSVG: function () {
    console.log("insert svg content");
    this.svg = d3.select("#graph_canvas .root");
    this.renderActorsSVG();
  }.observes('controller.length'),

  renderActorsSVG: function() {
    data = this.get('controller.content').toArray();
    // set the text element to handle
    this.actorText   = this.svg.selectAll("text").data(data);
    this.actorCircle = this.svg.selectAll("circle").data(data);

    // enter state: append text
    this.actorText.enter().append("text")
      .attr("text-anchor", "middle")
      .attr("data-selected", false)
      .call(this.actorDraggable())
      .on('click', this.actorClick());
    this.actorCircle.enter().append("circle")
      .attr("r", function(d) { return d.get('radius'); })
      .call(this.actorDraggable())
      .on('click', this.actorClick());
    this.tickActors();
    // exit state: remove unused text
    this.actorText.exit().remove();
    this.actorCircle.exit().remove();
  },

  tick: function () {
    this.tickActors();
  }.observes('controller.@each.name'),

  tickActors: function() {
    // update state: update text content and coordinates
    this.actorText.text(function(d){ return d.get('name'); })
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

  addActor: function() {
    view = this;
    return function (event) {
      console.log("click: add node");
      var offset = $(this).offset(); 

      // TODO: manage the scaling case in position when adding new actor

      var coords = {
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top - 20),
      }
      view.controller.send('add', coords.x, coords.y);
    };
  },

  actorDraggable: function() {  
    view = this;
    return d3.behavior.drag()
    .on('dragstart', function (d) {
      // store initial position of the node
      d.__init__ = { x: d.get('x'), y: d.get('y') }
    })
    .on('drag', function (d) {
      // move the coordinates of the node
      d.set('x', d.get('x') + d3.event.dx);  
      d.set('y', d.get('y') + d3.event.dy);  
      view.tick();
    })
    .on('dragend', function (d) {
      // store changes only if node was really translated
      if (d.__init__.x != d.get('x') && d.__init__y != d.get('y')) {
        // update position changes to the server
        if(!d.get('isNew')) {
          d.get('store').commit();
        };
      }
      delete d.__init__;
    });
  },

  actorClick: function() {
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
