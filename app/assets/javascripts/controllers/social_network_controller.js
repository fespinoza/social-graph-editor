App.SocialNetworkController = Ember.ObjectController.extend({
  addActor: function() {
    var actor = App.Actor.createRecord({name: "New Actor", x: 100, y: 200});
    this.get('model.actors').pushObject(actor);
  }
});