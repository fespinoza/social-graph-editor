DS.RESTAdapter.map('App.Relation', {
  actors: { embedded: 'always' }
});

App.Store = DS.Store.extend({
  revision: 11
});
