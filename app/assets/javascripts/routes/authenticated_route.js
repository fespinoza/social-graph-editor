App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    console.log("checking authentication");
    if (App.Auth.isAuthenticated()) {
      console.log("already authenticated!");
    } else {
      this.redirectToLogin(transition);
    }
  },

  redirectToLogin: function(transition) {
    this.transitionTo('users.login');
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
