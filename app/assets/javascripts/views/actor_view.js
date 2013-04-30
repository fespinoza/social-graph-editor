App.ActorView = Ember.View.extend({
  templateName: 'actor',
  didInsertElement: function () {
    if (this.get('controller.isNew')) {
      console.log("is new");
      this.$().find("input").focus();
    };
  },
});
