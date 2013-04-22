App.ActorController = Ember.ObjectController.extend({
  isShowingDetails: false,
  isEditing: false,
  toggleDetails: function() {
    this.set('isShowingDetails', !this.get('isShowingDetails'));
  },
  toggleEdit: function() {
    this.set("isEditing", !this.get('isEditing'));
  },
  save: function() {
    this.set("isEditing", false);
    this.set("isShowingDetails", false);
    this.get('store').commit();
  },
  delete: function() {
    if (confirm("Are you sure to dele the actor?")) {
      this.get('model').deleteRecord();
      this.get('store').commit();
    };
  }
});
