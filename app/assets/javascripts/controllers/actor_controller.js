App.ActorController = Ember.ObjectController.extend({
  save: function () {
    this.set('isEditing', false);
    this.get('store').commit();
  },
  toggleEditing: function () {
    this.set('isEditing', !this.get('isEditing'));
  },
});
