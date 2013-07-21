App.UserIndexController = Ember.ObjectController.extend({
  errorMessage: null,

  startEditing: function() {
    console.log("user index: start editing");
    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.User, {}));
    this.set('errorMessage', null);
  },

  register: function() {
    console.log("user index: register");
    validParams = this.get('email') != null &&
                  this.get('password') != null &&
                  this.get('password') == this.get('password_confirmation');
    if (validParams) {
      //commit and then clear the local transaction
      this.transaction.commit();
      this.transaction = null;
      this.set('errorMessage', null);
      // TODO: show email duplication error
    } else {
      this.set('errorMessage', 'Email and Password must be presetent and Password and Password Confirmation must be equal');
    }
  },

  stopEditing: function() {
    console.log("user index: stop editing");
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
      this.set('errorMessage', null);
    }
  },

  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
      // TODO: sucess message
      App.Auth.authenticate(this.get('token'), this.get('id'));
      this.transitionToRoute('social_networks.index');
    }
  }.observes('content.token'),
})
