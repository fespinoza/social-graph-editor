App.ApplicationRoute = Ember.Route.extend({
  events: {
    logout: function() {
      this.controllerFor('users_login').set('token', undefined);
      delete localStorage.token
      this.transitionTo('users.login');
    },
  },
})
