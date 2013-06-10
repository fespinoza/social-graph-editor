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
        this.set('controller.selectedFamily', this.get('content'));
        $("#family_instructions").addClass("hide");
      }
    }
  },

  enableOnRigthMode: function(){
    kind = this.get('content.kind');
    mode = this.get('controller.socialNetwork.currentMode');
    if (this.get('lastMode') != mode) { this.clearSelected(); }
    if (kind === mode) {
      this.$().addClass('enabled')
    } else {
      this.$().removeClass('enabled');
    }
    this.set('lastMode', mode);
  }.observes('controller.socialNetwork.currentMode'),

  clearSelected: function() {
    this.$().removeClass('selected');
    this.set('controller.selectedFamily', null);
    $("#family_instructions").removeClass("hide");
  },
});
