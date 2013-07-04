App.SocialNetworksController = Ember.ArrayController.extend({
  delete: function (socialNetwork) {
    if (confirm("Are you sure to delete the social network "+socialNetwork.get('name')+", all it's data will be deleted")) {
      socialNetwork.deleteRecord();
      socialNetwork.get('store').commit();
    }
  },
});
