App.Actor = DS.Model.extend({
  name: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  social_network: DS.belongsTo('App.SocialNetwork'),
});