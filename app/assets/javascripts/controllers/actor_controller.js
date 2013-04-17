App.ActorController = Ember.ObjectController.extend({
  toggleDetails: function() {
    this.set('isShowingDetails', !this.get('isShowingDetails'));
  },
});