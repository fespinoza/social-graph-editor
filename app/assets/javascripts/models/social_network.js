App.SocialNetwork = DS.Model.extend({
  name: DS.attr('string'),
  scale: DS.attr('number'),
  translation_x: DS.attr('number'),
  translation_y: DS.attr('number'),
  nodes: DS.hasMany('App.Node'),
  translationString: function() {
    return this.get('translation_x') + ", " + this.get('translation_y');
  },
});
