App.SocialNetworksJoinView = Ember.View.extend({
  templateName: 'social_networks/join',
  
  didInsertElement: function() {
    this.$("input[type='file']").filestyle();
  },
});
