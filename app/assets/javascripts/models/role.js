App.Role = DS.Model.extend({
  name: DS.attr('string'),
  actor: DS.belongsTo("App.Node", { inverse: "actor_roles" }),
  relation: DS.belongsTo("App.Node", { inverse: "relation_roles" }),
  social_network: DS.belongsTo("App.SocialNetwork"),
  
  x1: function() {
    return this.get('actor.cx');
  }.property('actor.x'),
  y1: function() {
    return this.get('actor.cy');
  }.property('actor.y'),
  x2: function() {
    return this.get('relation.cx');
  }.property('relation.cx'),
  y2: function() {
    return this.get('relation.cy');
  }.property('relation.cy'),

  text_x: function() {
    return (this.get('x1') + this.get('x2'))/2; 
  }.property('x1', 'x2'),
  text_y: function() {
    return (this.get('y1') + this.get('y2'))/2 + 10; 
  }.property('y1', 'y2'),
  
});
