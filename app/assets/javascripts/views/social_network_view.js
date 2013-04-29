App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this;
    this.$().find('#graph_canvas').on('click', function (event) {
      console.log("click: add actor");
      var offset = $(this).offset(); 
      var coords = {
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top - 20),
      }
      view.controller.send('addActor', coords.x, coords.y);
    });
  },
});


App.ActorsView = Ember.View.extend({
  templateName: 'actors',
  didInsertElement: function () {
    var view = this;
    this.get('controller.content').on('didLoad', function () {
      view.renderSVG();
    });

    this.$().find('.actor span').popover({
      title: 'actor details',
      html: true,
      content: function () {
        return $(this).siblings('.details').html(); 
      }
    });
  },
  renderSVG: function () {
    console.log("insert svg content");
    var view = this;
    var svg = d3.select("#graph_canvas");
    var data = this.get('controller.content').toArray();
    
    // define dragging behavior
    var draggable = d3.behavior.drag()
    .on('dragstart', function (d) {
      console.log("drag start for "+d.get('id'));
    })
    .on('drag', function (d) {
      // move the coordinates of the actor
      d.set('x', d.get('x') + d3.event.dx);  
      d.set('y', d.get('y') + d3.event.dy);  
      view.tick();
    })
    .on('dragend', function (d) {
      console.log('drag end for '+d.get('id'));
      // update position changes to the server
      d.get('store').commit();
    });

    var toggleDetails = function(d) {
      d3.event.stopPropagation();
      console.log("actor details for "+d.get('name'));
    };

    // set the text element to handle
    this.text   = svg.selectAll("text").data(data);
    this.circle = svg.selectAll("circle").data(data);

    // enter state: append text
    this.text.enter().append("text")
      .attr("text-anchor", "middle")
      .call(draggable)
      .on('click', function() { d3.event.stopPropagation(); })
      .on('dblclick', toggleDetails);
    this.circle.enter().append("circle")
      .attr("r", function(d) { return d.get('radius'); })
      .call(draggable)
      .on('click', function() { d3.event.stopPropagation(); })
      .on('dblclick', toggleDetails);

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
  }.observes('controller.@each.name')
});
