App.UserEditView = Ember.View.extend({
  didInsertElement: function() {
    var view = this;
    this.$('input').on('change', function () {
      view.get('controller').send('resetMessages');
    });
    var self = this,
        validator = new App.Validator();
    validator.extractValue = function(field) {
      return self.get('controller.'+field);
    };
    this.set('validator', validator);
  },

  submit: function() {
    console.log("update user");
    var v = this.get('validator'),
        isValid = v.runValidations(function () {
          return [
            v.presenceOf("Email", "#userEmail"),
            v.presenceOf("Email", "#userEmail"),
            v.emailFormat("Email", "#userEmail"),
            v.presenceOf("Password", "#userPassword"),
            v.minimunLengthOf("NewPassword", "#userNewPassword", 6),
            v.equalityBetween("NewPasswordConfirmation", "#userNewPasswordConfirmation", "NewPassword"),
          ];
        });
    if (isValid) {
      console.log("valid!");
      this.get('controller').send('update');
    } else {
      console.log("invalid!");
    }
  },
});
