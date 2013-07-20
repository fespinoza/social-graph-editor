App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this;
    var canvas = d3.select("#graph_canvas");
    this.root = canvas.append("g").attr("class", "root");
    var socialNetwork = this.socialNetwork = this.get('controller.content');
    this.persistChangesInterval = null;

    // TODO: kind of reset the d3 coordinates when reloading the page
    //       and when pressing the reset cooridnates button

    //var zoom = d3.behavior.zoom()
      //.on("zoom", function () {
        //view.socialNetwork.set('scale', d3.event.scale);
        //view.socialNetwork.set('translation_x', d3.event.translate[0]);
        //view.socialNetwork.set('translation_y', d3.event.translate[1]);
        //view.tick();

        //// reset the timeout to persist the social network changes
        //// TODO: find a better way to do this, it interferes with the
        ////       creation of nodes
        ////window.clearTimeout(view.persistChangesInterval);
        ////view.persistChangesInterval = window.setTimeout(function () {
          ////console.log("persisting SN changes");
          ////view.socialNetwork.get('store').commit();
        ////}, 1000);
      //});
    //canvas.call(zoom);
    this.tick();

    // tooltip definitions
    this.$('.states .btn').tooltip();
    this.$('.operations .edit').tooltip();
    this.$('.zoom-buttons .btn').tooltip();

    // zoom buttons calls
    this.$('.zoom-buttons .zoom-in').on('click', function() {
      view.zoomTo(socialNetwork.get('scale') + 0.2);
    });
    this.$('.zoom-buttons .zoom-out').on('click', function() {
      view.zoomTo(socialNetwork.get('scale') - 0.2);
    });
    this.$('.zoom-buttons .zoom-reset').on('click', function() { view.zoomTo(1); });
  },

  // zoom buttons execution
  zoomTo: function(scale) {
    var transaction = this.socialNetwork.get('store').transaction();
    transaction.add(this.socialNetwork);
    this.socialNetwork.set('scale', scale);
    this.tick();
    transaction.commit();
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

  selectModeButton: function() {
    buttonClass = "." + this.get('controller.currentMode').toLowerCase();
    // fix the active button if the value was change inside the app
    if(!$(".states "+buttonClass).hasClass("active")) {
      $(".states .btn").removeClass("active");
      $(".states "+buttonClass).addClass("active");
    }
  }.observes('controller.currentMode'),

});
