App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    console.log("checking authentication");
    if (!this.controllerFor('users_login').get('token')) {
      this.redirectToLogin(transition);
    } else {
      console.log("already authenticated!");
    }
  },

  redirectToLogin: function(transition) {
    var loginController = this.controllerFor('users_login');
    loginController.set('attemptedTransition', transition);
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
