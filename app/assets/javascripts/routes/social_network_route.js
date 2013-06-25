App.SocialNetworkRoute = App.AuthenticatedRoute.extend({
  model: function(params) {
    console.log("social network route");
    return App.SocialNetwork.find(params.social_network_id);
  }
});
