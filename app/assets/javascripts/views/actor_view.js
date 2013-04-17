App.ActorView = Ember.View.extend({
  classNames: ['actor'],
  click: function(event) {
    event.stopPropagation();
  },
  didInsertElement: function() {
    $("#"+this.get('elementId')).find("input").focus();
  },
});