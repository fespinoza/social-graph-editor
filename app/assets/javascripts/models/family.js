App.Family = DS.Model.extend({
  name: DS.attr('string'),
  color: DS.attr('string'),
  kind: DS.attr('string'),
  social_network: DS.belongsTo('App.SocialNetwork'),
  nodes: DS.hasMany('App.Node'),
});
