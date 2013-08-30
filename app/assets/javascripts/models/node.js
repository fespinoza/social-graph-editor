App.Node = DS.Model.extend({
  // attributes
  name: DS.attr('string'),
  kind: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),

  // relationships
  social_network: DS.belongsTo('App.SocialNetwork'),
  families: DS.hasMany('App.Family'),
  actor_roles: DS.hasMany('App.Role', { inverse: 'actor' }),
  relation_roles: DS.hasMany('App.Role', { inverse: 'relation' }),
  node_attributes: DS.hasMany('App.NodeAttribute'),

  // computed attributes
  radius: function(){
    return 12;
  }.property(),
  cx: function () {
    return this.get('x');
  }.property('x'),
  cy: function () {
    return this.get('y') + this.get('radius');
  }.property('y'),
  text_x: function () {
    return this.get('x');
  }.property('x'),
  text_y: function () {
    return this.get('y') + 3*this.get('radius');
  }.property('y'),
  isActor: function() {
    return this.get('kind') == "Actor"; 
  }.property(),

  roles: function() {
    if (this.get('kind') === "Actor") {
      return this.get('actor_roles');
    } else {
      return this.get('relation_roles');
    }
  }.property('actor_roles', 'relation_roles'),
});
