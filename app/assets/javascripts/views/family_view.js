App.FamilyView = Ember.View.extend({
  templateName: "family",
  classNames: ["item", "family"],

  click: function() {
    console.log("clicked on family "+this.get('content.name'));
    if(this.$().hasClass('selected')) {
      this.$().removeClass('selected');
      this.set('controller.selectedFamily', null);
    } else {
      $("#families .family").removeClass('selected');
      this.$().addClass('selected');
      this.set('controller.selectedFamily', this.get('content'));
    }
  },
});
