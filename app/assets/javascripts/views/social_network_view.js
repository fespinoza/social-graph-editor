App.SocialNetworkView = Ember.View.extend({
  click: function(event) {
    console.log("add actor!");
    var offset = this.$().find('#graph_canvas').offset();
    var coords = {
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top),
    }
    this.controller.send('addActor', coords.x, coords.y);
  }
});


App.ActorsView = Ember.View.extend({
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

    var node = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "actor")
    .on("click", function(d) {
      d3.event.stopPropagation();
      console.log("actor "+d.get('id')+" clicked!");
    });

    var circle = node.append('circle')
    .attr('r', function(d) { return d.get('radius'); })
    .attr('cx', function(d) { return d.get('cx'); })
    .attr('cy', function(d) { return d.get('cy'); });

    var text = node.append('text')
    .text(function(d) { return d.get('name'); })
    .attr('x', function(d) { return d.get('text_x') })
    .attr('y', function(d) { return d.get('text_y') })
    .attr('text-anchor', 'middle');
  }.observes('controller.length'),
});
