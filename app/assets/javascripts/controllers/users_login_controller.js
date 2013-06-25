App.UsersLoginController = Ember.Controller.extend({
  errorMessage: null,

  reset: function() {
    this.setProperties({
      email: '',
      password: '',
      errorMessage: null,
    });
  },

  token: localStorage.token,
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),
  
  login: function() {
    var self = this;
    this.set('errorMessage', null);
    data = { user: this.getProperties('email', 'password') };
    $.post('/users/login.json', data).then(function(response) {
      console.log(response);
      self.set('token', response.user.token);
      self.transitionToRoute('social_networks.index');
    });
  },
});
