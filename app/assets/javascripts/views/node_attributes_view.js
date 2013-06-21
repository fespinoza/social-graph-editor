App.NodeAttributesView = Ember.View.extend({
  templateName: 'node_attributes',
  didInsertElement: function() {
    attributesView = this;
    $graphCanvas = $("#graph_canvas");
    $graphCanvas.on('nodeSelected', function(event, nodeId) { 
      attributesView.updateNode(nodeId); });
    this.updateNode();
  },

  updateNode: function(nodeId) {
    if (!nodeId) { nodeId = $('#node_form').attr('data-node-id'); }
    console.log("update node! "+nodeId);
    this.set('controller.node', App.Node.find(nodeId));
  },
});
