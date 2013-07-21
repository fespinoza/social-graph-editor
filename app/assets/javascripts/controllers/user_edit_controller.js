App.UserEditController = Ember.ObjectController.extend({
  reset: function() {
    this.transaction = null;
    this.set('errorMessage', null);
    this.set('successMessage', null);
    this.set('password', null);
    this.set('newPassword', null);
    this.set('newPasswordConfirmation', null);
  },

  startEditing: function() {
    this.reset();
    this.transaction = this.get('store').transaction();
    this.transaction.add(this.get('content'));
  },

  update: function() {
    if (this.get('newPassword') == this.get('newPasswordConfirmation')) {
      var controller = this;
      this.get('content').on('becameError', function() {
        controller.set('errorMessage', "Current Password was mistaken");
      });
      this.get('content').on('didUpdate', function() {
        controller.set('successMessage', "User successfully updated");
      });
      this.transaction.commit();
    } else {
      this.set('errorMessage', "New password and its confirmation should match");
    }
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
