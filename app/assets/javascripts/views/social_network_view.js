App.SocialNetworkView = Ember.View.extend({
  click: function(event) {
    console.log("add actor!");
    var offset = this.$().find('#graph_canvas').offset();
    var coords = {
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top),
    }
    this.controller.send('addActor', coords.x, coords.y);
  }
});
