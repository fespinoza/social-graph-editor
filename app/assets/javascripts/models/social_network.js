App.SocialNetwork = DS.Model.extend({
  name: DS.attr('string'),
  nodes: DS.hasMany('App.Node')
});
