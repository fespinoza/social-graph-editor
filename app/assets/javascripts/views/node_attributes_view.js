App.NodeAttributesView = Ember.View.extend({
  templateName: 'node_attributes',
  didInsertElement: function() {
    nodeId = $('#node_form').data('node-id');
    this.set('controller.node', App.Node.find(nodeId));
  },
});
