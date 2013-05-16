App.FamiliesView = Ember.View.extend({
  didInsertElement: function() {
    $graphCanvas = $("#graph_canvas");

    // store social network
    socialNetworkId = $graphCanvas.data('social-network-id');
    socialNetwork = App.SocialNetwork.find(socialNetworkId);
    this.set('controller.socialNetwork', socialNetwork); 
  },

});
