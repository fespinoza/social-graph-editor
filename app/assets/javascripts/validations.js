App.Validator = function(){
  return {
    runValidations: function(definedValidations, valueExtractor) {
      var isValid = true;
      definedValidations().forEach(function(validation){
        isValid = validation && isValid;
      });
      return isValid;
    },

    // this handle the logic to extract the value
    // of the view or controller
    // the default behavior is to raise an exception
    // because in this default implementation i don't have
    // access to the controller or the view itself
    extractValue: function(value) {
      throw "You have to implement how extract values (called with "+value+")";
    },

    // logic to extract attribute value from name
    getAttributeValue: function(fieldName) {
      var field = fieldName.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}).replace(/^_/, '');
      console.log(fieldName+": "+this.extractValue(field)+" ("+field+")");
      return this.extractValue(field); // this.get('controller.' + field);
    },

    // ======================================================================
    // external interface of validators
    presenceOf: function(fieldName, fieldId) {
      var attribute = this.getAttributeValue(fieldName),
      validator = this.validations.presence;
      return this.runValidation(fieldName, fieldId, attribute, validator);
    },

    emailFormat: function (fieldName, fieldId) {
      var attribute = this.getAttributeValue(fieldName),
      validator = this.validations.emailFormat;
      return this.runValidation(fieldName, fieldId, attribute, validator);
    },

    minimunLengthOf: function (fieldName, fieldId, min) {
      var attribute = this.getAttributeValue(fieldName),
      validator = this.validations.minLength(min);
      return this.runValidation(fieldName, fieldId, attribute, validator);
    },

    equalityBetween: function(fieldName, fieldId, secondFieldName) {
      var attribute = this.getAttributeValue(fieldName),
      secondAttribute = this.getAttributeValue(secondFieldName),
      validator = this.validations.equalsTo(secondAttribute);
      return this.runValidation(fieldName, fieldId, attribute, validator);
    },

    // = = = = = = = = = = = = = = = = = = = = 
    // generic pure validations logic
    validations: {
      presence: {
        run: function(attribute) { return attribute != "" && attribute != null; },
        message: function(field) { return field + " must be present" }
      },
      emailFormat: {
        run: function(attribute) { return /^.+@.+\..+$/.test(attribute); },
        message: function(field) { return field + " must be a valid email"; }
      },
      minLength: function(min) {
        return {
          run: function(attribute) { 
            return attribute != null && attribute.length >= min;
          },
          message: function(field) { return field + " must be at least "+min+" characters long"; }
        }
      },
      equalsTo: function(comparisonValue) {
        return {
          run: function(attribute) { return attribute === comparisonValue; },
          message: function(field) { return field + " must be equal to "+comparisonValue; }
        }
      },
    },

    // generic validation function according to bootstrap
    runValidation: function(fieldName, fieldId, attribute, validator) {
      if(validator.run(attribute)) {
        $(fieldId).parents(".control-group").removeClass("error");
        $(fieldId).siblings(".help-inline").remove();
        return true;
      } else {
        // if the error message was not already set on screen
        if($(fieldId).siblings(".help-inline").length == 0) {
          message = validator.message(fieldName);
          $(fieldId).parents(".control-group").addClass("error");
          $(fieldId).parents(".controls").append("<span class='help-inline'>"+message+"</span>");
        }
        return false;
      }
    },
  }
};
