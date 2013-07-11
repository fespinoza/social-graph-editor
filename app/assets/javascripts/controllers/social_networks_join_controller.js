App.SocialNetworksJoinController = Ember.Controller.extend({
  needs: ['social_networks'],
  currentStep: 1,
  originalSocialNetwork: null,

  next: function() {
    this.set('currentStep', this.get('currentStep') + 1);
  },

  isFirstStep: function() {
    return this.get('currentStep') == 1;
  }.property('currentStep'),

  cancel: function() {
    this.set('currentStep', 1);
    this.set('originalSocialNetwork', null);
    this.transitionToRoute('social_networks.index');
  },

});
