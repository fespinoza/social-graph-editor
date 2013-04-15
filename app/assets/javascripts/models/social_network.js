App.SocialNetwork = DS.Model.extend({
  name: DS.attr('string'),
  actors: DS.hasMany('App.Actor')
});