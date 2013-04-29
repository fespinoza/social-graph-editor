App.SocialNetworkController = Ember.ObjectController.extend({
  addActor: function(x, y) {
    var actor = App.Actor.createRecord({name: "New Actor", x: x, y: y});
    this.get('model.actors').pushObject(actor);
  }
});

App.ActorController = Ember.ObjectController.extend({
  save: function () {
    this.get('store').commit();
  },
});
