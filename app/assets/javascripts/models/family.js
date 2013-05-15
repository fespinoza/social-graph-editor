App.Family = DS.Model.extend({
  name: DS.attr('string'),
  color: DS.attr('string'),
  kind: DS.attr('kind'),
  social_network: DS.belongsTo('App.SocialNetwork'),
});
