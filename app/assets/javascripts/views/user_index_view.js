App.UserIndexView = Ember.View.extend({

  didInsertElement: function(){
    var self = this,
        validator = new App.Validator();
    validator.extractValue = function(field) {
      return self.get('controller.'+field);
    };
    this.set('validator', validator);
  },

  submit: function() {
    console.log("register");
    var v = this.get('validator'),
        isValid = v.runValidations(function () {
          return [
            v.presenceOf("Email", "#newUserEmail"),
            v.presenceOf("Email", "#newUserEmail"),
            v.emailFormat("Email", "#newUserEmail"),
            v.presenceOf("Password", "#newUserPassword"),
            v.minimunLengthOf("Password", "#newUserPassword", 6),
            v.equalityBetween("PasswordConfirmation", "#newUserPasswordConfirmation", "Password"),
          ];
        });
    if (isValid) {
      console.log("valid!");
      this.get('controller').send('register');
    } else {
      console.log("invalid!");
    }
  },

});
