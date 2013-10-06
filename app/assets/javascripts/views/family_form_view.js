App.FamilyFormView = Ember.View.extend({
  tagName: 'form',
  classNames: ['modal form-horizontal'],
  templateName: "family_form",

  didInsertElement: function () {
    this.open();
    var self = this,
        validator = new App.Validator();
    validator.extractValue = function(field) {
      return self.get('content.'+field);
    };
    this.set('validator', validator);
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
    var v = this.get('validator'),
        isValid = v.runValidations(function () {
          return [
            v.presenceOf("Name", "#familyName"),
            v.presenceOf("Kind", "#familyKind"),
          ];
        });
    if (isValid) {
      this.get('controller').send('save');
      this.$().modal('hide');
    }
  },

  cancel: function() {
    this.close();
    this.get('controller').send('cancel');
  },

});
