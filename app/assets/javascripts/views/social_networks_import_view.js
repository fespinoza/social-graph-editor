App.SocialNetworksImportView = Ember.View.extend({
  templateName: 'social_networks/import',
  didInsertElement: function() {
    console.log("using it");
    var self = this;
    this.$('#file').on('change', function(event) {
      self.set('controller.errorMessage', null);
      console.log("changed file content!");
      var input = event.target;
      if (input.files && input.files[0]) {
        console.log("Really doing it");
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log("executing!");
          self.set('controller.fileContents', e.target.result);
        }
        reader.readAsText(input.files[0]);
      }
    });
    this.$("input[type='file']").filestyle();
  },
})
