App.SocialNetworksEditRoute = App.AuthenticatedRoute.extend({
  model: function(params) {
    return App.SocialNetwork.find(params.social_network_id);
  }
});
