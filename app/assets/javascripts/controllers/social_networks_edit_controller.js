App.SocialNetworksEditController = Ember.ObjectController.extend({
  startEditing: function() {
    this.transaction = this.get('store').transaction();
    this.transaction.add(this.get('content'));
  },

  stopEditing: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('social_networks.index');
  },

  save: function () {
    this.transaction.commit();
    this.transitionToRoute('social_networks.index');
  },
});
