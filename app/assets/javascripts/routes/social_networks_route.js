App.SocialNetworksRoute = App.AuthenticatedRoute.extend({
  model: function() {
    return App.SocialNetwork.find();
  }
});
