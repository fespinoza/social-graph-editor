App.ApplicationRoute = Ember.Route.extend({
  events: {
    logout: function() {
      App.Auth.reset();
      this.transitionTo('users.login');
    },
  },
})
