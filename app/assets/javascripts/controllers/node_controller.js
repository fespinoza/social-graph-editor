App.NodeController = Ember.ObjectController.extend({
  selectedFamilies: [],

  save: function () {
    // assign selected families into the node
    this.get('content.families').pushObjects(this.get('selectedFamilies'));

    this.get('store').commit();
    $("#graph_canvas").trigger('nodeUpdate');

    // go to Role mode if node was a Relation
    if(this.get('kind') == "Relation") {
      this.set("social_network.currentMode", "Role");
    }
  },
});
