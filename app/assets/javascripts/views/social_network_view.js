App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this;
    this.$().find('#graph_canvas').on('click', function (event) {
      console.log("click: add actor");
      var offset = $(this).offset(); 
      var coords = {
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
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
      view.insertSVGcontent();
    });
  },
  insertSVGcontent: function () {
    console.log("insert svg content");
    var svg = d3.select("#graph_canvas");
    var data = this.get('controller.content').toArray();

    // set the text element to handle
    var text = svg.selectAll("text").data(data);

    // enter state: append text
    text.enter().append("text").attr("text-anchor", "middle");

    // update state: update text content and coordinates
    text.text(function(d){ return d.get('name'); })
    .attr("x", function(d) { return d.get('text_x') })
    .attr("y", function(d) { return d.get('text_y') });

    // exit state: remove unused text
    text.exit().remove();

  }.observes('controller.length'),
});
