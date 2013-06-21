App.NodeAttributesController = Ember.ArrayController.extend({
  add: function() {
    node = this.get('node');
    attribute = App.NodeAttribute.createRecord({});
    node.get('node_attributes').pushObject(attribute);
    this.get('store').commit();
  },

  delete: function(attribute) {
    attribute.deleteRecord();
    this.get('store').commit();
  },
});
