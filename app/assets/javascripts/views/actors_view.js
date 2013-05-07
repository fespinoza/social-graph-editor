App.ActorsView = Ember.View.extend({
  templateName: 'actors',
  didInsertElement: function () {
    var view = this;
    $('#graph_canvas').on('click', function (event) {
      console.log("click: add actor");
      var offset = $(this).offset(); 
      var coords = {
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top - 20),
      }
      view.controller.send('add', coords.x, coords.y);
    });
    this.get('controller.content').on('didLoad', function () {
      view.renderSVG();
    });
  },
  renderSVG: function () {
    console.log("insert svg content");
    var view = this;
    var svg  = d3.select("#graph_canvas");
    var data = this.get('controller.content').toArray();
    
    // set the text element to handle
    this.text   = svg.selectAll("text.actor").data(data);
    this.circle = svg.selectAll("circle.actor").data(data);

    // enter state: append text
    this.text.enter().append("text")
      .attr("class", "actor")
      .attr("text-anchor", "middle")
      .attr("data-selected", false)
      .call(this.actorDraggable())
      .on('click', this.actorClick());
    this.circle.enter().append("circle")
      .attr("class", "actor")
      .attr("r", function(d) { return d.get('radius'); })
      .call(this.actorDraggable())
      .on('click', this.actorClick());

    this.tick();

    // exit state: remove unused text
    this.text.exit().remove();
    this.circle.exit().remove();

  }.observes('controller.length'),
  tick: function () {
    // update state: update text content and coordinates
    this.text.text(function(d){ return d.get('name'); })
      .attr("x", function(d) { return d.get('text_x') })
      .attr("y", function(d) { return d.get('text_y') });

    this.circle.attr('cx', function(d) { return d.get('cx'); })
      .attr('cy', function(d) { return d.get('cy'); });
    
    $("#graph_canvas").trigger("actorTick");
  }.observes('controller.@each.name'),
  actorClick: function(d) {
  },
  actorDraggable: function() {
    var view = this;
    return d3.behavior.drag()
    .on('dragstart', function (d) {
      // store initial position of the actor
      d.__init__ = { 
        x: d.get('x'),
        y: d.get('y')
      }
    })
    .on('drag', function (d) {
      // move the coordinates of the actor
      d.set('x', d.get('x') + d3.event.dx);  
      d.set('y', d.get('y') + d3.event.dy);  
      view.tick();
    })
    .on('dragend', function (d) {
      // store changes only if actor was really translated
      if (d.__init__.x != d.get('x') && d.__init__y != d.get('y')) {
        console.log("update position");
        // update position changes to the server
        if(!d.get('isNew')) {
          d.get('store').commit();
        };
      } else {
        console.log("didn't update");
      }
      delete d.__init__;
    });
  },
  actorClick: function() {
    var view = this;
    return function (d) {
      d3.event.stopPropagation();
      console.log("actor clicked "+d.get('name'));
      d.set('isSelected', !d.get('isSelected'));
      // set the controller current actor to this actor
      view.set('controller.currentActor', d);
      // remove current new actor
      view.get('controller').send('clearCurrentNewActor');
    };
  },
  toggleActorSelection: function() {
    console.log("toggle actor selection");
    // add selected class to actor
    var actorCircles = d3.selectAll("circle.actor");  
    actorCircles.classed("selected", function(d){ return d.get('isSelected') })
  }.observes("controller.@each.isSelected"),
});
