App.Actor = DS.Model.extend({
  name: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  social_network: DS.belongsTo('App.SocialNetwork'),
  relations: DS.hasMany('App.Relation'),
  radius: 20,
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
  isEditing: function () {
    return false; 
  }.property(),
  isSelected: function () {
    return false;
  }.property(),
});
