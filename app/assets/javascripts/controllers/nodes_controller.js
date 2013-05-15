App.NodesController = Ember.ArrayController.extend({
  currentNode: null,
  currentNewNode: null,

  add: function(x, y) {
    // clear unsaved new node
    this.clearCurrentNewNode();

    // create node
    var node = App.Node.createRecord({name: "New Node", x: x, y: y});
    node.set('isEditing', true);

    // set as current node and current new node
    this.set('currentNode', node);
    this.set('currentNewNode', node);
    
    // add node to the nodes lists
    this.get('content').pushObject(node);

    // unlink from current new node if node was saved
    controller = this;
    node.on('didCreate', function () {
      controller.set('currentNewNode', null);        
    });
  },

  delete: function (node) {
    if (confirm("Are you sure to delete the node "+node.get('name')+"?")) {
      console.log("deleting an node");
      this.set('currentNode', null);
      node.deleteRecord();
      this.get('store').commit();
    }
  },

  clearCurrentNewNode: function () {
    if (this.get('currentNewNode') != null) {
      this.get('currentNewNode').deleteRecord();
      this.set('currentNewNode', null);
    }
  },

});
