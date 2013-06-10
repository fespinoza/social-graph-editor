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

  tick: function() {
    this.root.attr(
      "transform",
      "translate("+this.socialNetwork.translationString()+") " +
      "scale("+this.socialNetwork.get('scale')+")"
    );
  },

  resetTranslationAndScale: function() {
    this.socialNetwork.set('translation_x', 0);
    this.socialNetwork.set('translation_y', 0);
    this.socialNetwork.set('scale', 1.0);
    this.socialNetwork.get('store').commit();
    this.tick();
  },

});
