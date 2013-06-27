App.User = DS.Model.extend({
  // attributes
  email: DS.attr('string'),
  password: DS.attr('string'),
  token: DS.attr('string'),

  // relations
  social_networks: DS.hasMany('App.SocialNetwork'),
});
