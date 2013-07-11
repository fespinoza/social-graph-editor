App.SocialNetworksEditController = Ember.ObjectController.extend({
  successMessage: null,

  startEditing: function() {
    this.transaction = this.get('store').transaction();
    this.transaction.add(this.get('content'));
    this.set('successMessage', null);
  },

  stopEditing: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
    this.set('successMessage', null);
  },

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('social_networks.index');
  },

  save: function () {
    this.transaction.commit();
    this.set('successMessage', "Social Network successfully updated");
    this.transitionToRoute('social_networks.index');
  },
});
