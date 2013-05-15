App.NodeView = Ember.View.extend({
  templateName: 'node',
  classNames: ['node_view'],
  didInsertElement: function () {
    if (this.get('controller.isNew')) {
      console.log("is new");
      this.$().find("input").focus();
    };
  },
});
