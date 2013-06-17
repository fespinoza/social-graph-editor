App.FamiliesView = Ember.View.extend({

  didInsertElement: function() {
    $graphCanvas = $("#graph_canvas");

    // store social network
    socialNetworkId = $graphCanvas.data('social-network-id');
    socialNetwork = App.SocialNetwork.find(socialNetworkId);
    this.set('controller.socialNetwork', socialNetwork); 
    this.set('controller.colors', d3.scale.category10());

    this.$('#families .family').tooltip({
      title: "Click on a family to be assigned by default to new actors or relations",
      placement: "right",
    });
  },

});
