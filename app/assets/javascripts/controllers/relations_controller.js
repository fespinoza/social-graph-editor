App.RelationsController = Ember.ArrayController.extend({
  currentRelation: null,
  selectedActors: [],
  toggleEditing: function() {
    this.set('currentRelation.isEditing', !this.get('currentRelation.isEditing'));
  },
  add: function () {
    // get the selected actors
    var actors = this.getSelectedActors();
    this.selectedActors = actors;
    // create the new relation with those actors
    var newRelation = App.Relation.createRecord({ name: "New Relation" });
    newRelation.get('actors').pushObjects(actors);
    newRelation.set('isEditing', true);
    this.set('currentRelation', newRelation);
    this.get('content').pushObject(newRelation);
  },
  delete: function() {
    relation = this.get('currentRelation');
    if (confirm("Are you sure to delete the relation "+relation.get('name'))) {
      relation.deleteRecord();
      this.get('store').commit();
      this.set('currentRelation', null);
    }
  },
  save: function() {
    this.get('store').commit();
    this.set('currentRelation.isEditing', false);
    this.deselectActors();
  },
  getSelectedActors: function () {
    return this.get('socialNetwork.actors').toArray().filter(function (element) {
      return element.get("isSelected") == true;
    });
  },
  deselectActors: function() {
    console.log("deselect actors");
    this.get('selectedActors').forEach(function (actor) {
      actor.set('isSelected', false);
    });
  },
});
