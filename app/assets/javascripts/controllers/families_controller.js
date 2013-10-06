App.FamiliesController = Ember.ArrayController.extend({
  sortProperties: ['kind', 'name'],
  sortAscending: true,
  colors: null,

  new: function() {
    colors = this.get('colors');
    attributes = { color: colors(this.get('content.length')) };
    mode = this.get('socialNetwork.currentMode');
    if (mode == "Actor" || mode == "Relation") {
      attributes['kind'] = mode
    }
    this.transaction = this.get('store').transaction();
    this.set('currentFamily', this.transaction.createRecord(App.Family, attributes));
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
    $("#graph_canvas").trigger('nodeUpdate');
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
      $("#graph_canvas").trigger('nodeUpdate');
    }
  },

  selectFamily: function(family) {
    this.set('socialNetwork.selectedFamily', family);
  },

  formTitle: function() {
    if (this.get('currentFamily.isNew')) {
      return "Create";
    } else {
      return "Update";
    }
  }.property('currentFamily'),
});
