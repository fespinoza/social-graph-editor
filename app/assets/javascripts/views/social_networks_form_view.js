App.SocialNetworkFormView = Ember.View.extend({
  templateName: 'social_networks/form',

  didInsertElement: function(){
    var self = this,
        validator = new App.Validator();
    validator.extractValue = function(field) {
      return self.get('controller.'+field);
    };
    this.set('validator', validator);
  },

  submit: function() {
    console.log("new social network!");
    var v = this.get('validator'),
        isValid = v.runValidations(function () {
          return [ v.presenceOf("Name", "#name") ];
        });
    if (isValid) {
      console.log("valid!");
      this.get('controller').send('save');
    } else {
      console.log("invalid!");
    }
  },
});
