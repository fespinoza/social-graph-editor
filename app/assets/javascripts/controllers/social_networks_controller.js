App.SocialNetworksController = Ember.ArrayController.extend({
  delete: function (socialNetwork) {
    if (confirm("Are you sure to delete the social network "+socialNetwork.get('name')+", all it's data will be deleted")) {
      socialNetwork.deleteRecord();
      socialNetwork.get('store').commit();
    }
  },
});

App.SocialNetworksNewController = Ember.ObjectController.extend({
  cancel: function () {
    this.transitionToRoute('social_networks');
  },
  save: function () {
    this.get('store').commit();
    this.transitionToRoute('social_networks');
  },
});
