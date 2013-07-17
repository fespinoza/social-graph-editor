App.NodeController = Ember.ObjectController.extend({
  selectedFamilies: [],
  lastContent: null,

  save: function () {
    this.get('store').commit();
    $("#graph_canvas").trigger('nodeUpdate');
  },

  setSelectedFamilies: function(){
    content = this.get('content');
    if (content != this.get('lastContent')) {
      this.set('selectedFamilies', this.get('content.families'));
      this.set('lastContent', content);
    }
  }.observes('content'),

});
