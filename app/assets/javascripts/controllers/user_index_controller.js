App.UserIndexController = Ember.ObjectController.extend({

  startEditing: function() {
    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.User, {}));
  },

  register: function() {
    //commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;
    // TODO: show email duplication error
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
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
