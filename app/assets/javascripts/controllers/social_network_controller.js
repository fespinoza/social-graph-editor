App.SocialNetworkController = Ember.ObjectController.extend({
  addActor: function(x, y) {
    var actor = App.Actor.createRecord({name: "New Actor", x: x, y: y});
    this.get('model.actors').pushObject(actor);
  }
});

App.ActorController = Ember.ObjectController.extend({
  isEditing: false,
  save: function () {
    this.set('isEditing', false);
    this.get('store').commit();
  },
  delete: function () {
    this.get('model').deleteRecord();
    this.get('store').commit();
  },
  toggleEditing: function () {
    this.set('isEditing', !this.get('isEditing'));
  },
});
