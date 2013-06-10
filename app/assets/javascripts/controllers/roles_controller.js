App.RolesController = Ember.ArrayController.extend({

  save: function() {
    this.get('store').commit();
  },

  delete: function(role) {
    message = "Are you sure to delete the role "+role.get('name')+"?"
    if (confirm(message)) {
      role.deleteRecord();
      this.get('store').commit();
      this.set('currentRole', null);
    }
  },

});
