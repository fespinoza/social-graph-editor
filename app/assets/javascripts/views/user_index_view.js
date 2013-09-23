App.UserIndexView = Ember.View.extend({

  submit: function() {
    console.log("register");
    var isValid = true;
    isValid = this.showErrorIfUndefined("Email", "#newUserEmail") && isValid;
    isValid = this.showErrorIfUndefined("Password", "#newUserPassword") && isValid;
    isValid = this.showErrorIfUndefined("PasswordConfirmation", "#newUserPasswordConfirmation") && isValid;

    if (isValid) {
      //this.get('controller').send('register');
      console.log("invalid!");
    } else {
      console.log("valid!");
    }
  },

  showErrorIfUndefined: function(fieldName, fieldId) {
    var attribute = this.get('content.'+fieldName.toLowerCase()),
        message   = fieldName + " must not be empty";
    if(attribute != "" && attribute != null) {
      this.$(fieldId).parents(".control-group").removeClass("error");
      this.$(fieldId).siblings(".help-inline").remove();
      return true;
    } else {
      // if the error message was not already set on screen
      if(this.$(fieldId).siblings(".help-inline").length == 0) {
        this.$(fieldId).parents(".control-group").addClass("error");
        this.$(fieldId).parents(".controls").append("<span class='help-inline'>"+message+"</span>");
      }
      return false;
    }
  },
});
