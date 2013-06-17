App.SocialNetworkController = Ember.ObjectController.extend({
  changeMode: function(newMode) {
    this.set('content.currentMode', newMode);
  },
});
