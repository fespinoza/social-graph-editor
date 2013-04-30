App.ActorController = Ember.ObjectController.extend({
  save: function () {
    this.set('isEditing', false);
    this.get('store').commit();
  },
  delete: function () {
    if (confirm("Are you sure to delete the actor "+this.get('name')+"?")) {
      this.get('model').deleteRecord();
      this.get('store').commit();
      // TODO: set currentActor null with this
    }
  },
  toggleEditing: function () {
    this.set('isEditing', !this.get('isEditing'));
  },
});
