App.Router.map(function() {
  this.resource("social_networks", function () {
    this.route("new");
    this.route("edit", { path: '/:social_network_id/edit' });
  });
  this.route("social_network", { path: "social_networks/:social_network_id" });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    return this.transitionTo('social_networks');
  },
});

App.SocialNetworksRoute = Ember.Route.extend({
  model: function() {
    return App.SocialNetwork.find();
  }
});

App.SocialNetworksNewRoute = Ember.Route.extend({
  model: function () {
    return App.SocialNetwork.createRecord();
  },
});

App.SocialNetworksEditRoute = Ember.Route.extend({
  model: function(params) {
    return App.SocialNetwork.find(params.social_network_id);
  }
});

App.SocialNetworkRoute = Ember.Route.extend({
  model: function(params) {
    return App.SocialNetwork.find(params.social_network_id);
  }
});
