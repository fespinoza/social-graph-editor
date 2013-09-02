App.FamilyFormView = Ember.View.extend({
  tagName: 'form',
  classNames: ['modal form-horizontal'],
  templateName: "family_form",

  didInsertElement: function () {
    this.open();
  },

  willDestroyElement: function () {
    this.close();
  },

  open: function() {
    this.$().modal('show');
    this.$("input").first().focus();
  },

  openOnContentChange: function() {
    this.open();
  }.observes('content'),

  close: function() {
    this.$().modal('hide');
  },

  submit: function() {
    var isValid = true;
    isValid = this.showErrorIfUndefined("Name", "#familyName") && isValid;
    isValid = this.showErrorIfUndefined("Kind", "#familyKind") && isValid;

    if (isValid) {
      this.get('controller').send('save');
      this.$().modal('hide');
    }
  },

  cancel: function() {
    this.close();
    this.get('controller').send('cancel');
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
