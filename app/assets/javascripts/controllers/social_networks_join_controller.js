App.SocialNetworksJoinController = Ember.Controller.extend({
  needs: ['social_networks'],
  currentStep: 1,
  originalSocialNetwork: null,
  importedSocialNetwork: null,
  errorMessage: null,
  successMessage: null,
  file: null,
  fileContents: null,

  reset: function() {
    this.set('currentStep', 1);
    this.set('originalSocialNetwork', null);
    this.set('errorMessage', null);
    this.set('successMessage', null);
    this.set('file', null);
    this.set('fileContents', null);
    if (this.get('importedSocialNetwork')) {
      this.get('importedSocialNetwork').deleteRecord();
      this.set('importedSocialNetwork', null);
    }
  },

  next: function() {
    var self = this;
    data = { 
      content: this.get('fileContents'),
      token: App.Auth.get('session.token'),
    };
    $("body").addClass("loading");
    $.post('/social_networks/import.json', data).then(
      function(response) {
        console.log(response);
        socialNetwork = App.SocialNetwork.find(response.social_network.id);
        socialNetwork.set('temporal', true);
        self.set('importedSocialNetwork', socialNetwork);
        self.set('file', null);
        self.set('fileContents', null);
        self.set('successMessage', "Social Network imported successfully");
        self.set('currentStep', self.get('currentStep') + 1);
        $("body").removeClass("loading");
      },
      function(event) {
        message = "It wasn't imported because a incorrect file " +
                  "format or RDF/N3 file invalid";
        self.set('errorMessage', message);
        $("body").removeClass("loading");
      }
    );

  equivalences: function() {
    result = [];
    families = this.get('importedSocialNetwork.families');
    if (families) {
      families.forEach(function(family, index){
        object = Ember.Object.create({
          family: family,
          eq: null,
        });
        result.push(object);
      });
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['family.kind', 'family.name'],
        content: result,
      });
    }
    return result 
  }.property('importedSocialNetwork'),

  join: function() {
    debugger; 
  },

  isFirstStep: function() {
    return this.get('currentStep') == 1;
  }.property('currentStep'),

  cancel: function() {
    this.reset();
    this.transitionToRoute('social_networks.index');
  },

});
