App.Relation = DS.Model.extend({
  name: DS.attr('string'),
  actors: DS.hasMany('App.Actor'),
  social_network: DS.belongsTo('App.SocialNetwork'),
});
