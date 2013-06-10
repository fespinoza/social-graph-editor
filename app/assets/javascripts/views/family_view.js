App.FamilyView = Ember.View.extend({
  templateName: "family",
  classNames: ["item", "family", "enabled"],
  lastMode: null,

  click: function() {
    console.log("clicked on family "+this.get('content.name'));
    if(this.$().hasClass('enabled')) {
      if(this.$().hasClass('selected')) {
        this.clearSelected();
      } else {
        $("#families .family").removeClass('selected');
        this.$().addClass('selected');
        this.get('controller').send('selectFamily', this.get('content'));
        $("#family_instructions").fadeOut();
      }
    }
  },

  enableOnRigthMode: function(){
    kind = this.get('content.kind');
    mode = this.get('controller.socialNetwork.currentMode');
    if (this.get('lastMode') != mode) { this.clearSelected(); }
    if (kind === mode || mode === "Hand") {
      this.$().addClass('enabled')
      this.$("span.label").css("background-color", this.get('content.color'));
    } else {
      this.$().removeClass('enabled');
      this.$("span.label").css("background-color", "");
    }
    this.set('lastMode', mode);
  }.observes('controller.socialNetwork.currentMode'),

  clearSelected: function() {
    this.$().removeClass('selected');
    this.get('controller').send('selectFamily', null);
    $("#family_instructions").fadeIn();
  },
});
