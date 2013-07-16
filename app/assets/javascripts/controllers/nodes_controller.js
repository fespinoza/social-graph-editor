App.NodesController = Ember.ArrayController.extend({
  currentNode: null,
  currentNewNode: null,

  add: function(kind, x, y) {
    // clear unsaved new node
    this.clearCurrentNewNode();

    // create node
    var node = App.Node.createRecord({
      name: "", kind: kind, x: x, y: y
    });

    selectedFamily = this.get('socialNetwork.selectedFamily');
    if (selectedFamily != null) {
      node.get('families').pushObject(selectedFamily);
    }

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
    kind = node.get('kind').toLowerCase();
    message = "Are you sure to delete the "+kind
              +" "+node.get('name')+"?";
    if (confirm(message)) {
      console.log("deleting an node");
      this.set('currentNode', null);
      node.get('families').toArray().forEach(function(family){
        family.get('nodes').removeObject(node);
      });
      node.get('roles').toArray().forEach(function(role){
        role.deleteRecord();
      });
      node.get('node_attributes').toArray().forEach(function(attribute){
        attribute.deleteRecord();
      });
      node.deleteRecord();
      this.get('store').commit();
    }
  },

  cancel: function() {
    this.set('currentNode', null);
    this.clearCurrentNewNode(); 
  },

  clearCurrentNewNode: function () {
    if (this.get('currentNewNode') != null) {
      this.get('currentNewNode').deleteRecord();
      this.set('currentNewNode', null);
    }
  },

  join: function(nodeA, nodeB) {
    var transaction    = this.get('store').transaction(),
        nodeAAtributes = nodeA.get('node_attributes').toArray(),
        nodeARoles     = nodeA.get('roles').toArray(),
        nodeAFamilies  = nodeA.get('families').toArray();

    transaction.add(nodeA);
    transaction.add(nodeB);

    nodeA.deleteRecord();

    nodeAAtributes.forEach(function(attribute){
      transaction.add(attribute);
      attribute.set('node', nodeB);
    });

    // TODO: handle relation case
    nodeARoles.forEach(function(role){
      transaction.add(role);
      role.set('actor', nodeB);
    });

    nodeAFamilies.forEach(function(family){
      transaction.add(family);
      family.get('nodes').removeObject(nodeA).pushObject(nodeB);
    });

    transaction.commit();
  },

});
