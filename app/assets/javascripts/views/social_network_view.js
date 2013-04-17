App.SocialNetworkView = Ember.View.extend({
  click: function(event) {
    console.log("add actor!");
    this.controller.send('addActor');
  }
});