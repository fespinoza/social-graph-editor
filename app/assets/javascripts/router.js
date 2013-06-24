App.Router.map(function() {
  this.resource("users", function () {
    this.route("new");
    this.route("login");
  }),
  this.resource("social_networks", function () {
    this.route("new");
    this.route("edit", { path: '/:social_network_id/edit' });
  });
  this.resource("social_network", { path: "social_networks/:social_network_id" }, function () {
    this.resource("families", function () {
      this.route("new"); 
    });
  });
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

App.UsersNewRoute = Ember.Route.extend({
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('users.new').stopEditing();
  }
});

App.UsersLoginRoute = Ember.Route.extend({
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    controller.reset();
  },

  deactivate: function() {
    this.controllerFor('users.login').reset();
  }
});
