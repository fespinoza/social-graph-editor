App.SocialNetworksNewRoute = App.AuthenticatedRoute.extend({
  model: function () {
    return null;
  },

  setupController: function(controller) {
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('social_networks.new').stopEditing(); 
  },
});
