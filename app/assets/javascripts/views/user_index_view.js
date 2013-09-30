App.UserIndexView = Ember.View.extend({

  submit: function() {
    console.log("register");

    var v = App.Validations;
    var isValid = v.runValidations([
      v.presenceOf("Email", "#newUserEmail"),
      v.presenceOf("Email", "#newUserEmail"),
      v.emailFormat("Email", "#newUserEmail"),
      v.presenceOf("Password", "#newUserPassword"),
      v.minimunLengthOf("Password", "#newUserPassword", 6),
      v.equalityBetween("PasswordConfirmation", "#newUserPasswordConfirmation", "Password"),
    ]);
    
    if (isValid) {
      console.log("valid!");
      this.get('controller').send('register');
    } else {
      console.log("invalid!");
    }
  },

});
