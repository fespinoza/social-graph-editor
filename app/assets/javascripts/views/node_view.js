App.NodeView = Ember.View.extend({
  templateName: 'node',
  classNames: ['node_view'],

  didInsertElement: function () {
    this.$().find("input").focus();
  },

  focusInput: function() {
    if (this.get('controller.isNew') && !this.get('controller.isSaving')) {
      console.log("is neeeeeewww");
      input = this.$('input');
      if (input) {
        input.focus();
      }
    }
  }.observes('controller.isNew'),

});
