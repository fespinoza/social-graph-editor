App.ActorController = Ember.ObjectController.extend({
  isShowingDetails: false,
  toggleDetails: function() {
    this.set('isShowingDetails', !this.get('isShowingDetails'));
  },
  saveNew: function() {
    this.get('store').commit();
  },
});