App.SocialNetworksNewRoute = App.AuthenticatedRoute.extend({
  model: function () {
    return App.SocialNetwork.createRecord();
  },
});
