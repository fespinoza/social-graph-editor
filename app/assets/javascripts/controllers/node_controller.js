App.NodeController = Ember.ObjectController.extend({
  selectedFamilies: [],
  lastContent: null,

  save: function () {
    this.get('content.families').pushObjects(this.get('selectedFamilies'));
    this.get('store').commit();
    $("#graph_canvas").trigger('nodeUpdate');

    // go to Role mode if node was a Relation
    if(this.get('kind') == "Relation") {
      this.set("social_network.currentMode", "Role");
    }
  },

  setSelectedFamilies: function(){
    content = this.get('content');
    if (content != this.get('lastContent')) {
      this.set('selectedFamilies', this.get('content.families'));
      this.set('lastContent', content);
    }
  }.observes('content'),

});
