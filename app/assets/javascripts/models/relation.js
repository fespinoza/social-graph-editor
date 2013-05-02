App.Relation = DS.Model.extend({
  name: DS.attr('string'),
  actors: DS.hasMany('App.Actor'),
  social_network: DS.belongsTo('App.SocialNetwork'),
  x: function() {
    var actors = this.get('actors').toArray();
    var sum = actors.reduce(function (sum, actor) {
      return sum + actor.get('cx');
    }, 0);
    return sum / actors.length;
  }.property('actors.@each.x'),
  y: function() {
    var actors = this.get('actors').toArray();
    var sum = actors.reduce(function (sum, actor) {
      return sum + actor.get('cy');
    }, 0);
    return sum / actors.length;
  }.property('actors.@each.y'),
});
