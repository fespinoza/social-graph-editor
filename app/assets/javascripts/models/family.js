App.Family = DS.Model.extend({
  // attributes
  name: DS.attr('string'),
  color: DS.attr('string'),
  kind: DS.attr('string'),

  // relations
  social_network: DS.belongsTo('App.SocialNetwork'),
  nodes: DS.hasMany('App.Node'),

  // computed properties
  isActorKind: function() {
    return this.get('kind') === "Actor";
  }.property('kind'),
});
