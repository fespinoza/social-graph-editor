App.NodeView = Ember.View.extend({
  templateName: 'node',
  classNames: ['node_view'],
  didInsertElement: function () {
    if (this.get('controller.isNew')) {
      console.log("is new");
      this.$().find("input").focus();
    };
    //nodeView = this;
    //$("#graph_canvas").on('nodeSelected', function() {
      //nodeView.applyChosen();
    //})
  },

  applyChosen: function() {
    $("#family_selector select").chosen();
  },
});
