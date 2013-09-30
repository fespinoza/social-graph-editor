App.UserIndexView = Ember.View.extend({

  submit: function() {
    console.log("register");

    var isValid = true;
    isValid = this.validatesPresenceOf("Email", "#newUserEmail") && isValid;
    isValid = this.validatesEmailFormat("Email", "#newUserEmail") && isValid;
    isValid = this.validatesPresenceOf("Password", "#newUserPassword") && isValid;
    isValid = this.validatesMinimunLengthOf("Password", "#newUserPassword", 6) && isValid;
    isValid = this.validatesEqualityBetween("PasswordConfirmation", "Password", "#newUserPasswordConfirmation") && isValid;
    
    if (isValid) {
      console.log("valid!");
      this.get('controller').send('register');
    } else {
      console.log("invalid!");
    }
  },

  // external interface of validators
  validatesPresenceOf: function(fieldName, fieldId) {
    var attribute = this.getAttributeValue(fieldName),
        message = fieldName + " must be present";
    return this.validate(fieldName, fieldId, attribute, this.validations.presence, message);
  },

  validatesEmailFormat: function (fieldName, fieldId) {
    var attribute = this.getAttributeValue(fieldName),
        message = fieldName + " must be a valid email";
    return this.validate(fieldName, fieldId, attribute, this.validations.emailFormat, message);
  },

  validatesMinimunLengthOf: function(fieldName, fieldId, min) {
    var attribute = this.getAttributeValue(fieldName),
        message = fieldName + " must be at least "+min+" characters long";
    validator = this.validations.minLength(min);
    return this.validate(fieldName, fieldId, attribute, validator, message);
  },

  validatesEqualityBetween: function(fieldName, secondFieldName, fieldId) {
    var attribute = this.getAttributeValue(fieldName),
        message = fieldName + " must match with "+secondFieldName,
        secondAttribute = this.getAttributeValue(secondFieldName);
    validator = this.validations.equalsTo(secondAttribute);
    return this.validate(fieldName, fieldId, attribute, validator, message);

  },

  // logic to extract attribute value from name
  getAttributeValue: function(fieldName) {
    var field = fieldName.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}).replace(/^_/, '');
    return this.get('controller.' + field);
  },

  // generic pure validations logic
  validations: {
    presence: function(attribute) { return attribute != "" && attribute != null; },
    emailFormat: function(attribute) { return /^.+@.+\..+$/.test(attribute); },
    minLength: function(min) { 
      return function(attribute) { 
        return attribute != null && attribute.length >= min;
      }
    },
    equalsTo: function(comparisonValue) {
      return function(attribute) { return attribute === comparisonValue }
    }
  },

  // generic validation function according to bootstrap
  validate: function (fieldName, fieldId, attribute, validator, message) {
    if(validator(attribute)) {
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
