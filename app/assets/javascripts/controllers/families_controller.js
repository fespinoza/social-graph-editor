App.FamiliesController = Ember.ArrayController.extend({
  new: function() {
    this.transaction = this.get('store').transaction();
    this.set('newFamily', this.transaction.createRecord(App.Family, {}))
  },

  save: function() {
    this.get('content').pushObject(this.get('newFamily'));
    this.transaction.commit();
    this.transaction = null;
    this.set('newFamily', null);
  },

  cancel: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
      this.set('newFamily', null);
    }
  },
});
