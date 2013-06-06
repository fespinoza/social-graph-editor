App.Node = DS.Model.extend({
  // attributes
  name: DS.attr('string'),
  kind: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),

  // relationships
  social_network: DS.belongsTo('App.SocialNetwork'),
  family: DS.belongsTo('App.Family'),

  // computed attributes
  radius: function(){
    return 20;
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
  family_id: function() {
    return this.get('family.id'); 
  }.property('family.id'),
});
