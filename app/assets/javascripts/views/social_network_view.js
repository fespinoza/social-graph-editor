App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var canvas = d3.select("#graph_canvas");
    var root = canvas.append("g").attr("class", "root");
    var zoom = d3.behavior.zoom()
      .on("zoom", function () {
        root.attr(
          "transform",
          "translate("+d3.event.translate.join(',')+") scale("+d3.event.scale+")"
        );
      })
    canvas.call(zoom);
  },
});
