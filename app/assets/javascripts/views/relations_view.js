App.RelationsView = Ember.View.extend({
  templateName: 'relations',
  didInsertElement: function() {
    var view = this;
    this.get('controller.content').on('didLoad', function () {
      view.renderSVG();
    });
    // update lines when actor was updated
    var $graphCanvas = $("#graph_canvas");
    $graphCanvas.on('actorTick', function () {
      view.tick();
    });
  },
  renderSVG: function() {
    console.log("render svg relations");
    var view = this;
    var svg  = d3.select("#graph_canvas");
    var data = this.get('controller.content').toArray();

    // set the svg element which will habdle the data
    this.line = svg.selectAll("line").data(data);

    // enter state: when new lines are created
    this.line.enter().append("line")
      .attr("stroke-width", 2)
      .attr("stroke", "red")
      .on('click', this.relationClick);

    // update state: set line coordinates
    this.tick();

    // exit state: when relations are deleted
    this.line.exit().remove();
  },
  relationClick: function(d) {
    d3.event.stopPropagation();
    console.log("click on relation "+d.get('name'));
  },
  tick: function() {
    console.log("relation tick");
    if (this.line) {
      this.line
        .attr("x1", function(d) { return d.get('actors').toArray()[0].get('cx'); })
        .attr("y1", function(d) { return d.get('actors').toArray()[0].get('cy'); })
        .attr("x2", function(d) { return d.get('actors').toArray()[1].get('cx'); })
        .attr("y2", function(d) { return d.get('actors').toArray()[1].get('cy'); });
    }
  },
});
