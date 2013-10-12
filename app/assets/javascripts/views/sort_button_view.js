App.SortButtonView = Ember.View.extend({
  sort: function() {
    console.log("it should sort things out");
    $("#graph_canvas").trigger('sortNodes');
  }
});
