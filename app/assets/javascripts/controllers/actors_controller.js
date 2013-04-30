App.ActorsController = Ember.ArrayController.extend({
  currentActor: null,
  addActor: function(x, y) {
    var actor = App.Actor.createRecord({name: "New Actor", x: x, y: y});
    actor.set('isEditing', true);
    this.set('currentActor', actor);
    this.get('content').pushObject(actor);
  }
});
