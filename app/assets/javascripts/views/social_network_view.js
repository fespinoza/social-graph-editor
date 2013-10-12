App.SocialNetworkView = Ember.View.extend({
  didInsertElement: function () {
    var view = this,
        canvas = d3.select("#graph_canvas"),
        $canvas = $("#graph_canvas");
    this.root = canvas.append("g").attr("class", "root");
    var socialNetwork = this.socialNetwork = this.get('controller.content');
    this.tick();
    $canvas.on('canvasUpdate', function() { view.tick(); })

    // tooltip definitions
    this.$('.states .btn').tooltip();
    this.$('.operations .edit').tooltip();
    this.$('.zoom-buttons .btn').tooltip();
    this.$('.extra-buttons .btn').tooltip();

    // zoom buttons calls
    this.$('.zoom-buttons .zoom-in').on('click', function() {
      scale = Math.min(socialNetwork.get('scale') + 0.2, 2);
      view.zoomTo(scale);
    });
    this.$('.zoom-buttons .zoom-out').on('click', function() {
      scale = Math.max(socialNetwork.get('scale') - 0.2, 0.4);
      view.zoomTo(scale);
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
      "translate("+this.socialNetwork.get('translation')+") " +
      "scale("+this.socialNetwork.get('scale')+")"
    );
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
