App.UserRoute = Ember.Route.extend({
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('user').stopEditing();
  }
});
