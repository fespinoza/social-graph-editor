App.UserEditView = Ember.View.extend({
  didInsertElement: function() {
    var view = this;
    this.$('input').on('change', function () {
      view.get('controller').send('resetMessages');
    });
  },
});
