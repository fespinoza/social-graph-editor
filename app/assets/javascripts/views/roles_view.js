App.RolesView = Ember.View.extend({

  didInsertElement: function() {
    $graphCanvas = $("#graph_canvas");
    this.socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    this.set('controller.socialNetwork', socialNetwork);
    roleView = this;
    $graphCanvas.on('nodeTick', function() { roleView.tick(); }); 
    $graphCanvas.on('roleTick', function() { roleView.tick(); }); 
    $graphCanvas.on('addRole', function(event, actor, relation) {
      roleView.get('controller').send('add', actor, relation);
    });
    this.renderSVG();
    this.$('input').focus();
  },

  renderSVG: function() {
    svg = d3.select("#graph_canvas .root");
    data = this.get('controller.content').toArray();
    this.roleLine = svg.selectAll("line.role").data(data);
    this.roleTextShadow = svg.selectAll("text.role-shadow").data(data);
    this.roleText = svg.selectAll("text.role").data(data);
    // enter
    this.roleLine.enter().append("line")
        .classed('role', true)
        .on('click', this.roleClick());
    this.roleTextShadow.enter().append("text")
        .classed('role-shadow', true);
    this.roleText.enter().append("text")
        .classed('role', true)
        .on('click', this.roleClick());
    // update
    this.tick();
    // exit
    this.roleLine.exit().remove();
    this.roleTextShadow.exit().remove();
    this.roleText.exit().remove();
  }.observes('controller.length'),

  tick: function() {
    this.roleLine
      .attr('x1', function(d) { return d.get('x1'); })
      .attr('y1', function(d) { return d.get('y1'); })
      .attr('x2', function(d) { return d.get('x2'); })
      .attr('y2', function(d) { return d.get('y2'); })
      .style('marker-end', 'url(#end-arrow)' );
    this.roleTextShadow
      .text(function(d) { return d.get('name'); })
      .attr('x', function(d) { return d.get('text_x'); })
      .attr('y', function(d) { return d.get('text_y'); });
    this.roleText
      .text(function(d) { return d.get('name'); })
      .attr('x', function(d) { return d.get('text_x'); })
      .attr('y', function(d) { return d.get('text_y'); })
  },

  roleClick: function() {
    roleView = this;
    return function(d) {
      console.log("role "+d.get('id')+" clicked!");
      d3.selectAll("line.role").classed("selected", false);
      if (roleView.get('controller.currentRole') == d) {
        roleView.set('controller.currentRole', null);
      } else {
        roleView.set('controller.currentRole', d);
        d3.select(this).classed("selected", true);
      }
    }
  },
});
