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
  },

  equivalences: function() {
    console.log("calculando equivalencias");
    result = [];
    families = this.get('importedSocialNetwork.families');
    isLoaded = this.get('importedSocialNetwork.isLoaded');
    if (families && isLoaded) {
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
    } else {
      console.log("no habian familias");
      return result;
    }
  }.property('importedSocialNetwork.isLoaded','importedSocialNetwork.families'),

  join: function() {
    var self = this;
    data = { 
      original_id: this.get('originalSocialNetwork.id'),
      imported_id: this.get('importedSocialNetwork.id'),
      equivalences: this.serializedEquivalences(),
      token: App.Auth.get('session.token'),
    };
    $("body").addClass("loading");
    $.post('/social_networks/join.json', data).then(
      function(response) {
        $("body").removeClass("loading");
        console.log(response);
        self.reset();
        socialNetwork = App.SocialNetwork.find(response.social_network.id);
        self.transitionToRoute('social_network.index', socialNetwork);
      },
      function(event) {
        $("body").removeClass("loading");
        self.reset();
        self.set('errorMessage', "Social Network join failed.");
      }
    );
  },

  isFirstStep: function() {
    return this.get('currentStep') == 1;
  }.property('currentStep'),

  cancel: function() {
    this.reset();
    this.transitionToRoute('social_networks.index');
  },

  serializedEquivalences: function() {
    result = {}
    this.get('equivalences').toArray().forEach(function(equivalence){
      result[equivalence.get('family.id')] = equivalence.get('eq.id');
    });
    return result;
  },

});
