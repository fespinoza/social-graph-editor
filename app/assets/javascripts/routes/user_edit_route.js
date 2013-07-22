App.UserEditRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.find(params.user_id);
  },

  setupController: function(controller, model) {
    controller.set('content', model);
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('user.edit').stopEditing();
  },
});
