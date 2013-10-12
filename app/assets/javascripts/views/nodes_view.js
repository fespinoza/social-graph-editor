App.NodesView = Ember.View.extend({
  templateName: 'nodes',

  didInsertElement: function () {
    view = this;
    this.targetNode = null;
    $graphCanvas = this.$graphCanvas = $("#graph_canvas");
    this.socialNetwork = App.SocialNetwork.find($graphCanvas.data('social-network-id'));
    this.set('controller.socialNetwork', socialNetwork);

    $graphCanvas.on('click', this.addNode());

    this.get('controller.content').on('didLoad', function () { 
      console.log("nodes did load");
      view.renderSVG(); 
    });

    $graphCanvas.on('nodeUpdate', function () { 
      console.log("node update");
      view.renderSVG(); 
    });

    console.log("did insert element!");
    this.renderSVG();

    $graphCanvas.on('forceTick', function() { view.tick(); });
  },

  reRender: function() {
    if (this.get('alreadyRendered')) {
      console.log("re render!");
      this.renderSVG();
    }
  }.observes('controller.length'),

  renderSVG: function () {
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
    this.set('alreadyRendered', true);
   },

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
    if (this.get('alreadyRendered')) {
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
      .attr('stroke', "black")
      .style('stroke', function(d) { 
        family = d.family;
        if (family) {
          return d3.rgb( family.get('color')).darker().toString(); 
        }
      })
      .style('fill', function (d) {
        family = d.family;
        if (family) {
          //if(selected) {
          //d3.rgb(colors(d.id)).brighter().toString()
          //} else {
          return family.get('color');
          //}
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
      .style('stroke', function(d) { 
        family = d.get('families').toArray()[0];
        if (family) {
          return d3.rgb( family.get('color')).darker().toString(); 
        }
      })
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
      var socialNetwork = view.get('socialNetwork'),
          currentMode = socialNetwork.get('currentMode');
      if(currentMode == "Actor" || currentMode == "Relation") {
        console.log("click: add node");
        var offset = $(this).offset(),
            scale = socialNetwork.get('scale'),
            verticalOffset = 20*scale;
        var coords = {
          x: (event.pageX - offset.left - socialNetwork.get('translation_x'))/scale,
          y: (event.pageY - offset.top - verticalOffset - socialNetwork.get('translation_y'))/scale,
        }
        view.controller.send('add', currentMode, coords.x, coords.y);
      };
    }
  },

  draggableNode: function() {  
    view = this;
    return d3.behavior.drag()
    .on('dragstart', function (d) {
      view.set('targetNode', null);
      var currentMode = view.get('socialNetwork.currentMode'),
          data = view.getData(d),
          dataKind = data.get('kind');
      if (currentMode == "Hand" || currentMode == "Join") {
        // store initial position of the node
        d.__init__ = { x: data.get('x'), y: data.get('y') }
      }

      if ((currentMode == "Role" || currentMode == "Relation") && dataKind == "Actor") {
        // reposition drag line
        view.drag_line
          .style('marker-end', 'url(#end-arrow)')
          .classed('hidden', false)
          .attr('d', 'M' + data.get('cx') + ',' + data.get('cy') + 'L' + data.get('cx') + ',' + data.get('cy'));
      }
    })
    .on('drag', function (d) {
      var currentMode = view.get('socialNetwork.currentMode'),
          data = view.getData(d);
      if (currentMode == "Hand" || currentMode == "Join") {
        // TODO: check a bug here
        // move the coordinates of the node
        data.set('x', data.get('x') + d3.event.dx);  
        data.set('y', data.get('y') + d3.event.dy);  
        view.tick();
      }

      if ((currentMode == "Role" || currentMode == "Relation") && data.get('kind') == "Actor") {
        // update drag line
        view.drag_line.attr('d', 'M' + data.get('cx') + ',' + data.get('cy') + 'L'
                            + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
      }
    })
    .on('dragend', function (d) {
      var currentMode = view.get('socialNetwork.currentMode'),
          data = view.getData(d);
      if (currentMode == "Hand") {
        // store changes only if node was really translated
        if (d.__init__.x != data.get('x') && d.__init__y != data.get('y')) {
          // update position changes to the server
          if(!data.get('isNew')) {
            data.get('store').commit();
          };
        }
        delete d.__init__;
      }

      if (currentMode == "Role" && data.get('kind') == "Actor") {
        if (view.get('targetNode.kind') == "Relation") {
          view.$graphCanvas.trigger('addRole', [data, view.get('targetNode')]);
        } else {
          console.log("you can't create role between actors");
        }
      }

      if (currentMode == "Relation" && data.get('kind') == "Actor") {
        if (view.get('targetNode.kind') == "Actor") {
          view.get('controller').send('addBinaryRelation', data, view.get('targetNode'));
        } else {
          console.log("you can create binary relations between 2 actors");
        }
      }

      dragLines = d3.selectAll(".dragline").classed("hidden", true);

      if (currentMode == "Join") {
        dropNode = view.getDropNode(data);
        console.log(dropNode);
        if (dropNode &&
            dropNode.get('kind') == data.get('kind') &&
            confirm("Are you sure to join these nodes?")) {
          console.log("do join between node "+data.get('id') + " and " + dropNode.get('id'));
          view.controller.send('join', data, dropNode);
        } else {
          // return the node to its original position
          console.log("reset node position");
          data.set('x', d.__init__.x);
          data.set('y', d.__init__.y);
        }
        view.tick();
        delete d.__init__;
      }

      view.drag_line.classed('hidden', true);
      view.set('targetNode', null);
    });
  },

  // because hover event does not trigger when dragging an element
  //
  // this method will return a node if its area intercepts with the area of the
  // given node
  //
  // in this case because they are two circles, if the mid point between 2 centers
  // is in the area of the two circles, it means that the 2 circles are overlaping
  getDropNode: function(node) {
    view = this;
    result = null;
    nodeCenter = node.getProperties('cx', 'cy');
    this.get('controller.content').toArray().forEach(function(n){
      if (node.get('id') != n.get('id')) {
        nCenter = n.getProperties('cx', 'cy');
        // calculate the medium point between the two nodes  
        midPoint = {
          cx: ((nCenter.cx + nodeCenter.cx) / 2),
          cy: ((nCenter.cy + nodeCenter.cy) / 2),
        }
        // check if the midpoint belongs to the node area
        belongsToNodeArea = view.nodeDistance(midPoint, nodeCenter) < node.get('radius');
        belongsToNArea    = view.nodeDistance(midPoint, nCenter) < n.get('radius');
        if (belongsToNodeArea && belongsToNArea) {
          result = n;
        }
      }
    });
    return result;
  },

  nodeDistance: function(a, b) {  
    return Math.sqrt(Math.pow((b.cx - a.cx), 2) + Math.pow(b.cy - a.cy, 2));
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
      view.$graphCanvas.trigger('nodeSelected', [data.get('id')]);
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
