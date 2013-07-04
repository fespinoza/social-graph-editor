App.SocialNetworksEditController = Ember.ObjectController.extend({
  cancel: function () {
    this.transitionToRoute('social_networks');
  },
  save: function () {
    this.get('store').commit();
    this.transitionToRoute('social_networks');
  },
});
