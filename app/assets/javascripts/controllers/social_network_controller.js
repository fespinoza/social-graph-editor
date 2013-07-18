App.SocialNetworkController = Ember.ObjectController.extend({
  changeMode: function(newMode) {
    this.set('content.currentMode', newMode);
  },

  export: function(visual_data, filename, url) {
    var self = this;
    if (!filename) { filename = this.get('name') + ".n3"; }
    if (!url) { url = "/social_networks/" + this.get('id') + ".rdf"; }
    data = { 
      token: App.Auth.get('session.token'),
      visual_data: visual_data,
    };
    $.get(url, data).then(function(response) {
      console.log(response);
      var a = document.createElement('a');
      var blob = new Blob([response], {'type':'application\/octet-stream'});
      a.href = window.URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    }, function(event) {
      self.set('errorMessage', "Something went wrong");
    });
  },

  exportVisual: function() {
    // TODO: check file name with spaces
    this.export(1, this.get('name') + "_visual.n3");
  },

  exportVocabulary: function() {
    url = "/2013/v1/vocabulary.rdf";
    filename = "Vocabulary.n3";
    this.export(null, filename, url);
  },
});
