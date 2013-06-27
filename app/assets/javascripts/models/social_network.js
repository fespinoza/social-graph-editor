App.SocialNetwork = DS.Model.extend({
  // attributes
  name: DS.attr('string'),
  scale: DS.attr('number', { defaultValue: 1 }),
  translation_x: DS.attr('number', { defaultValue: 0 }),
  translation_y: DS.attr('number', { defaultValue: 0 }),

  // relations
  nodes: DS.hasMany('App.Node'),
  families: DS.hasMany('App.Family'),
  roles: DS.hasMany('App.Role'),
  user: DS.belongsTo('App.User'),

  translationString: function() {
    return this.get('translation_x') + ", " + this.get('translation_y');
  },

  actorFamilies: function() {
    return this.get('families').toArray().filter(function (family) {
      return (family.get("kind") === "Actor");
    })
  }.property("families.@each.kind", "families.@each.name"),

  relationFamilies: function() {
    return this.get('families').toArray().filter(function (family) {
      return (family.get("kind") === "Relation");
    })
  }.property("families"),

  currentMode: function() {
    return "Hand"; // Other values "Actor", "Relation", "Role"
  }.property(),

  selectedFamily: function() {
    return null;
  }.property(),

});
