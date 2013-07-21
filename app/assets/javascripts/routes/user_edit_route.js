App.UserEditRoute = Ember.Route.extend({
  model: function(params) {
    console.log("user edit model");
    return App.User.find(params.user_id);
  },

  setupController: function(controller, model) {
    console.log("setup controller");
    controller.set('content', model);
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('user.edit').stopEditing();
  },
});
