App.SocialNetworkController = Ember.ObjectController.extend({
  changeMode: function(newMode) {
    this.set('content.currentMode', newMode);
  },

  export: function(visual_data, filename) {
    var self = this;
    if (!filename) { filename = this.get('name') + ".n3"; }
    data = { 
      token: App.Auth.get('session.token'),
      visual_data: visual_data,
    };
    url = "/social_networks/" + this.get('id') + ".rdf";
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
    this.export(1, this.get('name') + "_visual.n3");
  },
});
