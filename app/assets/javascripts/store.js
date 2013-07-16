App.AuthenticatedRESTAdapter = DS.RESTAdapter.extend({
  ajax: function(url, type, hash) {
    hash         = hash || {};
    hash.headers = hash.headers || {};
    hash.headers['HTTP_X_API_TOKEN'] = localStorage.token;
    return this._super(url, type, hash);
  },
  serializer: DS.RESTSerializer.extend({
    addHasMany: function (hash, record, key, relationship) {
      var type = record.constructor,
          name = relationship.key,
          serializedHasMany = [], 
          manyArray, embeddedType;

      manyArray = record.get(name);
      manyArray.forEach(function (record) {
        if (!record.get('isDeleted')) {
          serializedHasMany.push(record.get('id'));
        }
      }, this);

      hash[this.singularize(name) + '_ids'] = serializedHasMany;
    }
  }),
});
App.AuthenticatedRESTAdapter.configure("plurals", { family: "families" });
App.AuthenticatedRESTAdapter.configure("plurals", { node_attribute: "node_attributes" });

App.Store = DS.Store.extend({
  adapter: App.AuthenticatedRESTAdapter.extend({}),
});
