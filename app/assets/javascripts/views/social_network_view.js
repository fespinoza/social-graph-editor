App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this;
    var canvas = d3.select("#graph_canvas");
    this.root = canvas.append("g").attr("class", "root");
    this.socialNetwork = this.get('controller.content');

    var zoom = d3.behavior.zoom()
      .on("zoom", function () {
        view.socialNetwork.set('scale', d3.event.scale);
        view.socialNetwork.set( 'translation_x', d3.event.translate[0]);
        view.socialNetwork.set( 'translation_y', d3.event.translate[1]);
        view.tick();
      });
    canvas.call(zoom);
  },

  tick: function() {
    this.root.attr(
      "transform",
      "translate("+this.socialNetwork.translationString()+") " +
      "scale("+this.socialNetwork.get('scale')+")"
    );
  },

});
