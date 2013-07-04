App.SocialNetworksNewController = Ember.ObjectController.extend({
  startEditing: function() {
    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.SocialNetwork, {}));
  },

  stopEditing: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  transitionAfterSave: function() {
    if (this.get('content.id')) {
      this.transitionToRoute('social_networks.index');
    }
  }.observes('content.id'),

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('social_networks.index');
  },

  save: function () {
    this.transaction.commit();
  },
});
