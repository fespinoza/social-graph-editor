App.Role = DS.Model.extend({
  name: DS.attr('string'),
  actor: DS.belongsTo("App.Node", { inverse: "actor_roles" }),
  relation: DS.belongsTo("App.Node", { inverse: "relation_roles" }),
  social_network: DS.belongsTo("App.SocialNetwork"),
  
  x1: function() {
    return this.get('actor.cx') + (this.get('actor.radius') * this.get('normX'));
  }.property('distance', 'actor.radius', 'normX'),

  y1: function() {
    return this.get('actor.cy') + (this.get('actor.radius') * this.get('normY'));
  }.property('distance', 'actor.radius', 'normY'),

  x2: function() {
    return this.get('relation.cx') - (this.get('relation.radius') * this.get('normX'));
  }.property('distance', 'relation.radius', 'normX'),

  y2: function() {
    return this.get('relation.cy') - (this.get('relation.radius') * this.get('normY'));
  }.property('distance', 'relation.radius', 'normY'),

  text_x: function() {
    return (this.get('x1') + this.get('x2'))/2; 
  }.property('x1', 'x2'),

  text_y: function() {
    return (this.get('y1') + this.get('y2'))/2 + 10; 
  }.property('y1', 'y2'),

  // for the padding calculations
  deltaX: function() {
    return this.get('relation.cx') - this.get('actor.cx');
  }.property('actor.x', 'relation.x'),

  deltaY: function() {
    return this.get('relation.cy') - this.get('actor.cy');
  }.property('actor.y', 'relation.y'),

  distance: function() {
    var deltaX = this.get('deltaX'),
        deltaY = this.get('deltaY');
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }.property('deltaX', 'deltaY'),

  normX: function() {
    return this.get('deltaX') / this.get('distance');
  }.property('distance', 'deltaX'),

  normY: function() {
    return this.get('deltaY') / this.get('distance');
  }.property('distance', 'deltaY'),
  
});
