App.User = DS.Model.extend({
  // attributes
  email: DS.attr('string'),
  password: DS.attr('string'),
  token: DS.attr('string'),

  // relations
  user: DS.hasMany('App.SocialNetwork'),
});
