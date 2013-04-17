App.ActorView = Ember.View.extend({
  classNames: ['actor'],
  click: function(event) {
    event.stopPropagation();
  }
});