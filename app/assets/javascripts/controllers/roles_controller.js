App.RolesController = Ember.ArrayController.extend({

  add: function(actor, relation) {
    role = App.Role.createRecord({ name: "" });
    role.set('actor', actor);
    role.set('relation', relation);
    role.set('social_network', this.get('socialNetwork'));
    this.get('store').commit();
    this.set('currentRole', role);
  },

  save: function() {
    this.get('store').commit();
    $("#graph_canvas").trigger('roleTick');
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
