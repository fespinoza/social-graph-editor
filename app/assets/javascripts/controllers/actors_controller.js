App.ActorsController = Ember.ArrayController.extend({
  currentActor: null,
  currentNewActor: null,

  add: function(x, y) {
    if (this.get('currentNewActor')) {
      console.log("there was a previous new actor");
      this.get('currentNewActor').deleteRecord();
    }

    var actor = App.Actor.createRecord({name: "New Actor", x: x, y: y});
    actor.set('isEditing', true);
    this.set('currentActor', actor);
    this.set('currentNewActor', actor);
    this.get('content').pushObject(actor);
  },

  delete: function (actor) {
    if (confirm("Are you sure to delete the actor "+actor.get('name')+"?")) {
      // set currentActor null with this
      this.set('currentActor', null);
      actor.deleteRecord();
      this.get('store').commit();
    }
  },
});
