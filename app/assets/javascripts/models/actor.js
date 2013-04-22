App.Actor = DS.Model.extend({
  name: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  social_network: DS.belongsTo('App.SocialNetwork'),
  radius: 20,
  cx: function () {
    return this.get('x') + 60;
  }.property('x'),
  cy: function () {
    return this.get('y') + 20;
  }.property('y'),
  text_x: function () {
    return this.get('x');
  }.property('x'),
  text_y: function () {
    return this.get('y') + 60;
  }.property('y'),
});
