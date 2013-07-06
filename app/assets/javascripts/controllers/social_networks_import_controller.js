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
    $("body").addClass("loading");
    $.post('/social_networks/import.json', data).then(
      function(response) {
        console.log(response);
        App.SocialNetwork.find(response.social_network.id);
        self.transitionToRoute('social_networks.index');
        self.set('file', null);
        self.set('fileContents', null);
        $("body").removeClass("loading");
      },
      function(event) {
        message = "It wasn't imported because a incorrect file format or RDF/N3 file invalid";
        self.set('errorMessage', message);
        $("body").removeClass("loading");
      }
    );
  },

  cancel: function() {
    this.set('file', null);
    this.set('fileContents', null);
    this.set('errorMessage', null);
    this.transitionToRoute('social_networks.index');
  },
});
