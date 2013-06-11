App.NodeController = Ember.ObjectController.extend({
  save: function () {
    this.get('store').commit();
    $("#graph_canvas").trigger('nodeUpdate');

    // go to Role mode if node was a Relation
    if(this.get('kind') == "Relation") {
      this.set("social_network.currentMode", "Role");
    }
  },
});
