DS.RESTAdapter.configure("plurals", { family: "families" });
App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.create({}),
});
