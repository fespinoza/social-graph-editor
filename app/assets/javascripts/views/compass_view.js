App.CompassView = Ember.View.extend({
  templateName: 'compass',
  socialNetwork: null,

  didInsertElement: function() {
    this.set('socialNetwork', this.get('controller.content'));
    var view = this,
        canvas = $("#graph_canvas"),
        directions = [
      { class: '.up', coordinate: 'translation_y', delta: +20, },
      { class: '.down', coordinate: 'translation_y', delta: -20, },
      { class: '.left', coordinate: 'translation_x', delta: -20, },
      { class: '.right', coordinate: 'translation_x', delta: +20, },
    ];
    directions.forEach(function(direction){
      this.$("#compass "+direction.class).on('click', function() {
        var transaction = view.get('socialNetwork.store').transaction();
        transaction.add(view.get('socialNetwork'));
        view.set('socialNetwork.'+direction.coordinate,
          view.get('socialNetwork.'+direction.coordinate) + direction.delta);
        canvas.trigger('canvasUpdate');
        transaction.commit();
      })
    });
    this.$('.reset').on('click', function() {
      var transaction = view.get('socialNetwork.store').transaction();
      transaction.add(view.get('socialNetwork'));
      view.set('socialNetwork.translation_x', 0);
      view.set('socialNetwork.translation_y', 0);
      canvas.trigger('canvasUpdate');
      transaction.commit();
    });
  },
});
