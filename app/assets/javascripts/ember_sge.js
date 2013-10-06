//= require ./store
//= require ./validations
//= require_tree ./models
//= require_tree ./controllers
//= require_tree ./views
//= require_tree ./helpers
//= require_tree ./templates
//= require ./router
//= require_tree ./routes
//= require_self

App.nodeKinds = ["Actor", "Relation"]

window.printNamesFor = function(object, relationName) {
  object.get(relationName).toArray().forEach(function(relation){
    console.log(relation.get('name'));
  });
}

App.AuthManager = Ember.Object.extend({
  init: function() {
    this._super();
    var token     = localStorage.token;
    var accountId = localStorage.accountId;
    if (App.Store && !Ember.isEmpty(token) && !Ember.isEmpty(accountId)) {
      this.authenticate(token, accountId);
    }
  },
 
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('session.token')) 
            && !Ember.isEmpty(this.get('session.user'));
  }.property('session.token', 'session.user'),
 
  authenticate: function(token, accountId) {
    var user = App.User.find(accountId);
    this.set('session', Ember.Object.create({
      token: token,
      user:  user
    }));
  },
 
  reset: function() {
    this.set('session', null);
  },
 
  sessionObserver: function() {
    if (Ember.isEmpty(this.get('session'))) {
      delete localStorage.token;
      delete localStorage.accountId;
    } else {
      localStorage.token = this.get('session.token');
      localStorage.accountId = this.get('session.user.id');
    }
  }.observes('session'),
});
