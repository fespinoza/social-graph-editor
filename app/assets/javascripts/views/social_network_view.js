App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this;
    var canvas = d3.select("#graph_canvas");
    this.root = canvas.append("g").attr("class", "root");
    this.socialNetwork = this.get('controller.content');
    this.persistChangesInterval = null;

    var zoom = d3.behavior.zoom()
      .on("zoom", function () {
        view.socialNetwork.set('scale', d3.event.scale);
        view.socialNetwork.set( 'translation_x', d3.event.translate[0]);
        view.socialNetwork.set( 'translation_y', d3.event.translate[1]);
        view.tick();

        // reset the timeout to persist the social network changes
        window.clearTimeout(view.persistChangesInterval);
        view.persistChangesInterval = window.setTimeout(function () {
          console.log("persisting SN changes");
          view.socialNetwork.get('store').commit();
        }, 1000);
      });
    canvas.call(zoom);
    this.tick();
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
    this.socialNetwork.set('scale', 0);
    this.socialNetwork.get('store').commit();
    // reset the transform attr in root
    this.root.attr("transform", null);
  },

});
