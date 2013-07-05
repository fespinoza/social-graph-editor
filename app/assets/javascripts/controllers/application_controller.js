App.ApplicationController = Ember.Controller.extend({
  errorMessage: null,

  reset: function() {
    this.setProperties({
      email: '',
      password: '',
      errorMessage: null,
    });
  },

  login: function() {
    var self = this;
    this.set('errorMessage', null);
    data = { user: this.getProperties('email', 'password') };
    $.post('/users/login.json', data).then(function(response) {
      console.log(response);
      App.Auth.authenticate(response.user.token, response.user.id);
      self.reset();
      self.transitionToRoute('social_networks.index');
    }, function (event) {
      self.set('errorMessage', 'Email or Password invalid.');
    });
  },

  logout: function() {
    App.Auth.reset();
    this.transitionToRoute('user');
  },
});
