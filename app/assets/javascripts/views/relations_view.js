App.RelationsView = Ember.View.extend({
  templateName: 'relations',
  didInsertElement: function() {
    var view = this;
    this.get('controller.content').on('didLoad', function () {
      view.renderSVG();
    });
    // update lines when actor was updated
    var $graphCanvas = $("#graph_canvas");
    $graphCanvas.on('actorTick', function () {
      view.tick();
    });

    // bind social network with the relations controller
    var socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    this.set('controller.socialNetwork', socialNetwork);

    $("#add_relation").on('click', function (event) {
      event.preventDefault();
      console.log("add relation");
      view.get('controller').send('add');
      return false;
    });
  },
  renderSVG: function() {
    console.log("render svg relations");
    var view = this;
    var svg  = d3.select("#graph_canvas");
    var data = this.get('controller.content').toArray();
    var lineData = this.relationLines();

    // set the svg element which will habdle the data
    this.circle = svg.selectAll("circle.relation").data(data);
    this.text   = svg.selectAll("text.relation").data(data);
    this.line   = svg.selectAll("line").data(lineData);

    // enter state: when new relations are created
    this.circle.enter().append("circle")
      .attr('class', 'relation')
      .attr('r', 2)
      .attr('fill', "blue")
    this.text.enter()
      .append('text')
      .attr('class', 'relation')
      .attr('text-anchor', 'middle')
      .on('click', this.relationClick());
    this.line.enter().append("line")
      .attr("stroke-width", 2)
      .attr("stroke", "red")

    // update state: relations are changed
    this.tick();

    // exit state: when relations are deleted
    this.circle.exit().remove();
    this.text.exit().remove();
    this.line.exit().remove();

  }.observes('controller.length'),
  tick: function() {
    console.log("relation tick");
    if (this.line) {
      this.line
        .attr("x1", function(d) { return d.x1; })
        .attr("y1", function(d) { return d.y1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y2", function(d) { return d.y2; });
      this.circle
        .attr('cx', function(d) { return d.get('x'); })
        .attr('cy', function(d) { return d.get('y'); });
      this.text
        .text(function(d) { return d.get('name');})
        .attr('x', function(d) { return d.get('x'); })
        .attr('y', function(d) { return d.get('y') + 20; });
    }
  },
  relationClick: function() {
    var view = this;
    return function (d) {
      d3.event.stopPropagation();
      console.log("click on relation "+d.get('name'));
      // set the clicked relation as current relation in controller
      view.set('controller.currentRelation', d);
    };
  },
  relationLines: function() {
    console.log("call relationLines");
    // returns an array of objects
    // and each object has the coordinates x, y of a relation and an actor

    // example: (r:relation, a:actor)
    // given
    //r1: a1 a2 a3
    //r2: a1 a4

    // returns
    //[[r1 a1], [r1 a2], [r1 a3], [r2 a1], [r2 a4]}
    var results = [],
        relations = this.get('controller.content').toArray();

    relations.forEach(function (relation) {
      relation.get('actors').toArray().forEach(function (actor) {
        line = {
          x1: relation.get('x'),
          y1: relation.get('y'),
          x2: actor.get('cx'),
          y2: actor.get('cy'),
        }
        results.push(line);
      });
    });

    return results;
  },
});
