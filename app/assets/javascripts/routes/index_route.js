App.IndexRoute = App.AuthenticatedRoute.extend({
  redirect: function () {
    return this.transitionTo('social_networks');
  },
});
