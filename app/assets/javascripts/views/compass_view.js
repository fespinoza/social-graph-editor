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
      var selector = "#compass "+direction.class,
          moveInDirection = function () {
            view.set('socialNetwork.'+direction.coordinate,
              view.get('socialNetwork.'+direction.coordinate) + direction.delta);
            canvas.trigger('canvasUpdate');
          },
          interval,
          transaction;

      this.$(selector).on('mousedown', function() {
        transaction = view.get('socialNetwork.store').transaction();
        transaction.add(view.get('socialNetwork'));
        interval = setInterval(moveInDirection, 100);
      });
      this.$(selector).on('mouseup mouseout', function() {
        clearInterval(interval);
        if (transaction) {
          transaction.commit();
          transaction = null;
        }
      });
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
