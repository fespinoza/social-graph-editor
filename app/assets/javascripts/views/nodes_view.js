App.NodesView = Ember.View.extend({
  templateName: 'nodes',
  readyToRender: false,

  didInsertElement: function () {
    view = this;
    this.targetNode = null;
    $graphCanvas = this.$graphCanvas = $("#graph_canvas");
    this.socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    this.set('controller.socialNetwork', socialNetwork);
    $graphCanvas.on('click', this.addNode());
    this.get('controller.content').on('didLoad', function () { view.renderSVG(); });
    $graphCanvas.on('nodeUpdate', function () { view.renderSVG(); });
    this.set('readyToRender', true);
  },

  renderSVG: function () {
    if (this.get('readyToRender')) {
      console.log("insert svg content");
      this.svg = d3.select("#graph_canvas .root");
      // define the end arrow
      this.svg
        .append('svg:defs')
        .append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');

      // line displayed when dragging new nodes
      this.drag_line = this.svg.append('svg:path')
        .attr('class', 'link dragline hidden')
        .attr('d', 'M0,0L0,0');
      this.renderActorsSVG();
      this.renderRelationsSVG();
    } else {
      console.log("not ready to render yet");
    }
  }.observes('controller.length'),

  renderActorsSVG: function() {
    data = this.get('controller.content').toArray().filter(function(node){
      return node.get('kind') == "Actor";
    });
    dataCircle = [];
    data.forEach(function(node){
      families = node.get('families').toArray().filter(function(family){
        return !family.get('isDeleted');
      });
      if (families.length > 0) {
        families.map(function(family, index) {
          //console.log([node.get('name'), family.get('name'), index]);
          dataCircle.push({node: node, family: family, index: index });
        });
      } else {
        dataCircle.push({node: node, family: null, index: 0 });
      }
    });
    // set the text element to handle
    this.actorText   = this.svg.selectAll("text.actor").data(data);
    this.actorCircle = this.svg.selectAll("circle.actor").data(dataCircle);

    // enter state: append text
    this.actorText.enter().append("text")
      .attr("class", "actor")
      .attr("text-anchor", "middle")
      .call(this.draggableNode())
      .on('click', this.nodeClick())
      .on('mouseover', this.nodeHover());
    this.actorCircle.enter().append("circle")
      .attr("class", "actor node figure")
      .call(this.draggableNode())
      .on('click', this.nodeClick())
      .on('mouseover', this.nodeHover());

    this.tickActors();
    // exit state: remove unused text
    this.actorText.exit().remove();
    this.actorCircle.exit().remove();
  },

  renderRelationsSVG: function() {
    data = this.get('controller.content').toArray().filter(function(node){
      return node.get('kind') == "Relation";
    });
    // set the text element to handle
    this.relationText = this.svg.selectAll("text.relation").data(data);
    this.relationRect = this.svg.selectAll("rect.relation").data(data);

    // enter state: append text
    this.relationText.enter().append("text")
      .attr("class", "relation")
      .attr("text-anchor", "middle")
      .call(this.draggableNode())
      .on('click', this.nodeClick())
      .on('mouseover', this.nodeHover());
    this.relationRect.enter().append("rect")
      .attr("width", function(d) { return d.get('radius'); })
      .attr("height", function(d) { return d.get('radius'); })
      .attr("class", "relation node figure")
      .call(this.draggableNode())
      .on('click', this.nodeClick())
      .on('mouseover', this.nodeHover());
    this.tickRelations();
    // exit state: remove unused text
    this.relationText.exit().remove();
    this.relationRect.exit().remove();
  },

  tick: function () {
    if (this.get('readyToRender')) {
      this.tickActors();
      this.tickRelations();
      if (this.$graphCanvas) { this.$graphCanvas.trigger('nodeTick'); }
    }
  }.observes('controller.@each.name'),

  tickActors: function() {
    // update state: update text content and coordinates
    this.actorText
      .text(function(d){ return d.get('name'); })
      .attr("x", function(d) { return d.get('text_x') })
      .attr("y", function(d) { return d.get('text_y') });

    this.actorCircle
      .attr("r", function(d) { return d.node.get('radius') - d.index * 4; })
      .attr('cx', function(d) { return d.node.get('cx'); })
      .attr('cy', function(d) { return d.node.get('cy'); })
      .attr('fill', function (d) {
        family = d.family;
        if (family) {
          return family.get('color');
        }
      });
  },

  tickRelations: function() {
    this.relationText
      .text(function(d) { return d.get('name'); })
      .attr("x", function(d) { return d.get('text_x') })
      .attr("y", function(d) { return d.get('text_y') - 7 });

    this.relationRect
      .attr('x', function(d) { return d.get('x') - d.get('radius')/2; })
      .attr('y', function(d) { return d.get('y') + d.get('radius')/2; })
      .attr('fill', function (d) {
        family = d.get('families').toArray()[0];
        if (family) {
          return family.get('color');
        }
      });
  },

  addNode: function() {
    view = this;
    return function (event) {
      enabled = view.get('socialNetwork.currentMode') == "Actor" ||
                view.get('socialNetwork.currentMode') == "Relation";
      if(enabled) {
        console.log("click: add node");
        var offset = $(this).offset(); 

        kind = view.get('socialNetwork.currentMode');

        // TODO: manage the scaling case in position when adding new actor
        var coords = {
          x: (event.pageX - offset.left),
          y: (event.pageY - offset.top - 20),
        }
        view.controller.send('add', kind, coords.x, coords.y);
      };
    }
  },

  draggableNode: function() {  
    view = this;
    return d3.behavior.drag()
    .on('dragstart', function (d) {
      view.set('targetNode', null);
      data = view.getData(d);
      // store initial position of the node
      if (view.get('socialNetwork.currentMode') == "Hand") {
        d.__init__ = { x: data.get('x'), y: data.get('y') }
      } else {
        if (view.get('socialNetwork.currentMode') == "Role" && data.get('kind') == "Actor") {
          // reposition drag line
          view.drag_line
            .style('marker-end', 'url(#end-arrow)')
            .classed('hidden', false)
            .attr('d', 'M' + data.get('cx') + ',' + data.get('cy') + 'L' + data.get('cx') + ',' + data.get('cy'));
        }
      }
    })
    .on('drag', function (d) {
      data = view.getData(d);
      if (view.get('socialNetwork.currentMode') == "Hand") {
        // move the coordinates of the node
        data.set('x', data.get('x') + d3.event.dx);  
        data.set('y', data.get('y') + d3.event.dy);  
        view.tick();
      } else {
        if (view.get('socialNetwork.currentMode') == "Role" && data.get('kind') == "Actor") {
          // update drag line
          view.drag_line.attr('d', 'M' + data.get('cx') + ',' + data.get('cy') + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
        }
      }

    })
    .on('dragend', function (d) {
      data = view.getData(d);
      if (view.get('socialNetwork.currentMode') == "Hand") {
        // store changes only if node was really translated
        if (d.__init__.x != data.get('x') && d.__init__y != data.get('y')) {
          // update position changes to the server
          if(!data.get('isNew')) {
            data.get('store').commit();
          };
        }
        delete d.__init__;
      } else {
        if (view.get('socialNetwork.currentMode') == "Role" && data.get('kind') == "Actor") {
          if (view.get('targetNode.kind') == "Relation") {
            view.$graphCanvas.trigger('addRole', [data, view.get('targetNode')]);
          } else {
            console.log("you can't create role between actors");
          }
        }
      }
      view.drag_line.classed('hidden', true)
      view.set('targetNode', null);
    });
  },

  nodeClick: function() {
    view = this;
    return function (d) {
      data = view.getData(d);
      console.log("node clicked "+data.get('name'));
      d3.selectAll(".node.figure").classed("selectedNode", false);
      d3.event.stopPropagation();
      // set the controller current node to this node
      view.set('controller.currentNode', data);
      // remove current new node
      view.get('controller').send('clearCurrentNewNode');
      d3.select(this).classed("selectedNode", true)
      //view.$graphCanvas.trigger('nodeSelected');
    };
  },

  nodeHover: function() {
    view = this;
    return function(d) {
      data = view.getData(d);
      view.set('targetNode', data);
    }
  },

  getData: function(d) {
    try {
      if(d.get('kind') == "Relation") {
        return d;
      }
    } catch (e) {
      return d.node;
    }
  },

});
