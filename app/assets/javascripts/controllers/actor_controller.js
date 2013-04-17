App.ActorController = Ember.ObjectController.extend({
  isShowingDetails: false,
  toggleDetails: function() {
    this.set('isShowingDetails', !this.get('isShowingDetails'));
  },
});