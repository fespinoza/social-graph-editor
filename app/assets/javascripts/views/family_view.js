App.FamilyView = Ember.View.extend({
  templateName: "family",
  classNames: ["item", "family", "enabled"],
  lastMode: null,

  didInsertElement: function() {
    this.$().addClass('enabled')
    this.$("span.label").css("background-color", this.get('content.color'));
  },

  click: function() {
    console.log("clicked on family "+this.get('content.name'));
    if(this.$().hasClass('selected')) {
      this.clearSelected();
    } else {
      $("#families .family").removeClass('selected');
      this.set('controller.socialNetwork.currentMode', this.get('content.kind'));
      this.get('controller').send('selectFamily', this.get('content'));
      this.$().addClass('selected');
    }
  },

  clearSelectionOnModeChange: function(){
    mode = this.get('controller.socialNetwork.currentMode');
    if (this.get('lastMode') != mode) { this.clearSelected(); }
    this.set('lastMode', mode);
  }.observes('controller.socialNetwork.currentMode'),

  clearSelected: function() {
    this.$().removeClass('selected');
    this.get('controller').send('selectFamily', null);
  },
});
