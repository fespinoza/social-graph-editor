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
    var transaction = this.get('store').transaction(),
        importedSN = this.get('importedSocialNetwork'),
        originalSN = this.get('originalSocialNetwork'),
        equivalences = this.get('equivalences').toArray();

    transaction.add(importedSN);
    transaction.add(originalSN);

    importedSN.deleteRecord();

    // change nodes sn
    importedSN.get('nodes').toArray().forEach(function(node){
      transaction.add(node);
      node.set('social_network', originalSN);
    });

    // change roles sn
    importedSN.get('roles').toArray().forEach(function(role){
      transaction.add(role);
      role.set('social_network', originalSN);
    });

    // handle the case for families and its equivalences
    equivalences.forEach(function(equivalence){
      var originalFamily = equivalence.get('eq'),
          importedFamily = equivalence.get('family');

      // if exist a original family equivalence to the
      // imported family
      if (originalFamily) {
        importedFamily.get('nodes').toArray().forEach(function(node){
          transaction.add(node);
          node.get('families').removeObject(importedFamily)
                              .pushObject(originalFamily);
        });
      } else {
        // if not the imported family is added to the 
        // original social network
        transaction.add(importedFamily);
        importedFamily.set('social_network', originalSN);
      }
    });

    transaction.commit();
    this.transitionToRoute('social_network', originalSN);
  },

  isFirstStep: function() {
    return this.get('currentStep') == 1;
  }.property('currentStep'),

  cancel: function() {
    this.reset();
    this.transitionToRoute('social_networks.index');
  },

});
