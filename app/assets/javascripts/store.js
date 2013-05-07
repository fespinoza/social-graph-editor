App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    serializer: DS.RESTSerializer.extend({
      addHasMany: function (hash, record, key, relationship) {
        var type = record.constructor,
            name = relationship.key,
            serializedHasMany = [], 
            manyArray, embeddedType;

        embeddedType = this.embeddedType(type, name);
        if (embeddedType === 'always') { return; }

        manyArray = record.get(name);

        manyArray.forEach(function (record) {
          serializedHasMany.push(record.get('id'));
        }, this);
        
        hash[this.singularize(name) + '_ids'] = serializedHasMany;
      }
    })
  })
});
