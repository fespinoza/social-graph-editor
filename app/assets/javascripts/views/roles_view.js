App.RolesView = Ember.View.extend({
  didInsertElement: function() {
    $graphCanvas = $("#graph_canvas");
    this.renderSVG();
    roleView = this;
    $graphCanvas.on('nodeTick', function() {
      roleView.tick();
    }); 
  },

  renderSVG: function() {
    console.log("rendering role svg");
    svg = d3.select("#graph_canvas .root");
    data = this.get('controller.content').toArray();
    this.roleLine = svg.selectAll("line.role").data(data);
    this.roleText = svg.selectAll("text.role").data(data);
    // enter
    this.roleLine.enter().append("line")
        .classed('role', true)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    this.roleText.enter().append("text")
        .classed('role', true);
    // update
    this.tick();
    // exit
    this.roleLine.exit().remove();
    this.roleText.exit().remove();
  }.observes('controller.length'),

  tick: function() {
    console.log("tick called");
    this.roleLine
      .attr('x1', function(d) { return d.get('x1'); })
      .attr('y1', function(d) { return d.get('y1'); })
      .attr('x2', function(d) { return d.get('x2'); })
      .attr('y2', function(d) { return d.get('y2'); });
    this.roleText
      .text(function(d) { return d.get('name'); })
      .attr('x', function(d) { return d.get('text_x'); })
      .attr('y', function(d) { return d.get('text_y'); })
  },
});
