App.UserEditController = Ember.ObjectController.extend({
  resetMessages: function() {
    this.set('errorMessage', null);
    this.set('successMessage', null);
  },

  reset: function() {
    this.resetMessages();
    this.transaction = null;
    this.set('password', null);
    this.set('new_password', null);
    this.set('new_password_confirmation', null);
  },

  startEditing: function() {
    this.reset();
    this.transaction = this.get('store').transaction();
    this.transaction.add(this.get('content'));
  },

  update: function() {
    var controller = this;
    this.get('content').on('becameError', function() {
      // handle error case
      // this is a manual fix because apparently ember-data does not implement
      // how to handle errors
      // more info here
      // http://stackoverflow.com/questions/14741377/what-can-you-do-with-ember-data-models-when-in-the-error-state
      controller.transaction = null;
      controller.get('stateManager').transitionTo('loaded.updated');
      controller.startEditing();

      controller.set('errorMessage', "Current Password was mistaken");
    });
    this.get('content').on('didUpdate', function() {
      controller.set('successMessage', "User successfully updated");
      controller.transitionToRoute('social_networks.index');
    });
    this.transaction.commit();
  },

  stopEditing: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.reset();
    }
  },

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('social_networks.index');
  },
});
