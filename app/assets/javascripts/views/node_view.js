App.NodeView = Ember.View.extend({
  templateName: 'node',
  classNames: ['node_view'],

  didInsertElement: function () {
    this.$('input').focus();
    this.$('#family_selector select').tooltip({
      placement: 'right',
      title: 'You can select multiple families holding the Ctrl key on windows or Command in mac while clicking the families',
    })
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
