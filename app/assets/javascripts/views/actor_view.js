App.ActorView = Ember.View.extend({
  tagName: 'li',
  classNames: ['actor'],
  templateName: 'actor',
  click: function(event) {
    event.stopPropagation();
  },
  didInsertElement: function() {
    this.get('content.model').translation = { x: 0, y: 0 };
    canvas = d3.select("svg#graph_canvas");
    this.svgView = canvas.append("g")
                   .attr("class", "actor")
    this.svgView.append("circle")
         .attr("cx", this.get('content.cx'))
         .attr("cy", this.get('content.cy'))
         .attr("r", this.get('content.radius'));
    this.text = this.svgView.append("text")
         .attr("x", this.get('content.text_x'))
         .attr("y", this.get('content.text_y'))
         .attr("text-anchor", "middle")
         .text(this.get('content.name'));
    this.svgView.append("circle")
         .attr("cx", this.get('content.text_x'))
         .attr("cy", this.get('content.text_y'))
         .attr("fill", "red")
         .attr("r", 2);
  },
  updateName: function () {
    this.text.text(this.get('content.name'));
  }.observes('content.name'),
  tick: function () {
    view = this;
    console.log("tick");
    this.svgView.attr("transform", function () {
      return ("translate("+view.get('content.translation.x')+","+view.get('content.translation.y')+")");
    });
  },
});
