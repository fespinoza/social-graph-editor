App.SocialNetworksEditRoute = App.AuthenticatedRoute.extend({
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('social_networks.edit').stopEditing(); 
  },
});
