App.ActorsController = Ember.ArrayController.extend({
  currentActor: null,
  currentNewActor: null,

  add: function(x, y) {
    // clear unsaved new actor
    this.clearCurrentNewActor();

    // create actor
    var actor = App.Actor.createRecord({name: "New Actor", x: x, y: y});
    actor.set('isEditing', true);

    // set as current actor and current new actor
    this.set('currentActor', actor);
    this.set('currentNewActor', actor);
    
    // add actor to the actors lists
    this.get('content').pushObject(actor);

    // unlink from current new actor if actor was saved
    controller = this;
    actor.on('didCreate', function () {
      controller.set('currentNewActor', null);        
    });
  },

  delete: function (actor) {
    if (confirm("Are you sure to delete the actor "+actor.get('name')+"?")) {
      // set currentActor null with this
      this.set('currentActor', null);
      actor.deleteRecord();
      this.get('store').commit();
    }
  },

  clearCurrentNewActor: function () {
    if (this.get('currentNewActor') != null) {
      this.get('currentNewActor').deleteRecord();
      this.set('currentNewActor', null);
    }
  },

});
