App.User = DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  token: DS.attr('string'),
});
