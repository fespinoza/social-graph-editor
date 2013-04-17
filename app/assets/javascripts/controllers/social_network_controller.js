App.SocialNetworkController = Ember.ObjectController.extend({
  addActor: function() {
    var actor = App.Actor.createRecord({name: "New Actor", x: 100, y: 200, isShowingDetails: true});
    this.get('model.actors').pushObject(actor);
  }
});