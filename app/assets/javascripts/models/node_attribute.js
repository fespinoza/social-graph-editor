App.NodeAttribute = DS.Model.extend({
  //attributes
  key: DS.attr('string'),
  value: DS.attr('string'),
  
  // relations
  node: DS.belongsTo('App.Node'),
});
