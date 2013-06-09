//= require ./store
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
