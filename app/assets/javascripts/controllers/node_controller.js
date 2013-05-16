App.NodeController = Ember.ObjectController.extend({
  save: function () {
    // add family from the form ID
    family = App.Family.find(this.get('content.family_id'));
    family.get('nodes').pushObject(this.get('content'));

    this.set('isEditing', false);
    this.get('store').commit();
    $("#graph_canvas").trigger('nodeUpdate');
  },

  toggleEditing: function () {
    this.set('isEditing', !this.get('isEditing'));
  },
});
