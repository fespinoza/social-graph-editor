App.UsersLoginController = Ember.Controller.extend({
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
    data = { user: this.getProperties('email', 'password') };
    $.post('/users/login.json', data).then(function(response) {
      console.log(response);
      var authToken = response.user.token;
      App.Store.authToken = authToken;
      App.Auth = App.User.find(response.user.id);

      localStorage.current_user_id = response.user.id;
      localStorage.current_user_token = response.user.token;

      self.transitionToRoute('index');
    })
  },
});
