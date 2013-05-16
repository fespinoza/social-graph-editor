App.FamiliesController = Ember.ArrayController.extend({
  new: function() {
    this.transaction = this.get('store').transaction();
    this.set('currentFamily', this.transaction.createRecord(App.Family, {}));
  },

  edit: function (family) {
    this.transaction = this.get('store').transaction();
    this.set('currentFamily', family);
    this.transaction.add(family);
  },

  save: function() {
    this.get('content').pushObject(this.get('currentFamily'));
    this.transaction.commit();
    this.transaction = null;
    this.set('currentFamily', null);
  },

  cancel: function() {
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
      this.set('currentFamily', null);
    }
  },

  delete: function(family) {
    if (confirm("Are you sure to delete the family "+family.get('name')+"?")) {
      family.deleteRecord(); 
      this.get('store').commit();
    }
  },
});
