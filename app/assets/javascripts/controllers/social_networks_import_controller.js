App.SocialNetworksImportController = Ember.Controller.extend({
  file: null,
  fileContents: null,
  errorMessage: null,
  needs: ['social_networks'],

  save: function() {
    var self = this;
    data = { 
      content: this.get('fileContents'),
      token: App.Auth.get('session.token'),
    };
    $.post('/social_networks/import.json', data).then(function(response) {
      console.log(response);
      App.SocialNetwork.find(response.social_network.id);
      self.transitionToRoute('social_networks.index');
      self.set('file', null);
      self.set('fileContents', null);
    }, function(event) {
      self.set('errorMessage', "It wasn't imported because a incorrect file format or RDF/N3 file invalid");
    });
  },
});
