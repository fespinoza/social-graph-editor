App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    if (!App.Auth.get('isAuthenticated')) {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    this.transitionTo('user');
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        alert('Something went wrong');
      }
    }
  }
});
