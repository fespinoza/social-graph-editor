# fruchterman_reingold.rb
# copyright 2006 giles bowkett (http://www.gilesgoatboy.org)
# licensed under the GPL

# This file implements the Fruchterman-Reingold algorithm for force-directed
# displacement of nodes in unidirected node-link graphs. For more detail on
# this algorithm, use CiteSeer to obtain the white paper:
#
# http://citeseer.ist.psu.edu/fruchterman91graph.html
#
# The code for this implementation of the algorithm draws from Tetrad, a
# statistical AI project in Java from Carnegie Mellon University. Tetrad
# and its code are under the GNU General Public License (GPL), so this code
# is also. Here comes the boilerplate:


#   This program is free software; you can redistribute it and/or modify      
#   it under the terms of the GNU General Public License as published by      
#   the Free Software Foundation; either version 2 of the License, or         
#   (at your option) any later version.                                       
#                                                                           
#   This program is distributed in the hope that it will be useful,           
#   but WITHOUT ANY WARRANTY; without even the implied warranty of            
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the             
#   GNU General Public License for more details.                              
#                                                                           
#   You should have received a copy of the GNU General Public License         
#   along with this program; if not, write to the Free Software               
#   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA


# OK, boilerplate over. Also, there's a much easier way to get a copy of
# the GPL:
#
# http://www.gnu.org/licenses/gpl.txt
#
# Finally, the original code was copyright 2005 Peter Spirtes, Richard
# Scheines, Joseph Ramsey, and Clark Glymour. The actual Fruchterman-
# Reingold code was written by Joseph Ramsey. This code is copyright
# 2006 Giles Bowkett, with thanks to Frank Wimberley.

module FruchtermanReingold

  Edge = Struct.new("Edge", :beginning, :end)          # contains Nodes
  Node = Struct.new("Node", :position, :disposition)   # contains Coordinates
  Coordinates = Struct.new("Coordinates", :x, :y)      # contains Fixnums

  class Graph

    # the Graph is what does everything. basically, the way I'm using this,
    # I create a Hash of Nodes with data objects holding other information
    # my application needs. to minimize the compute time of this code, which
    # is relatively involved, I first build a graph with lots of overlapping
    # nodes. so I already have Nodes with x and y values before I even create
    # my Graph. the initial Node x and y values are actually kind of sloppy
    # in my app, but that's OK because you use the initial graph as a seed.
    # Fruchterman-Reingold is expensive for laying out simple graphs but very
    # good at eliminating overlap, so I give it a graph with lots of overlap
    # and let it do its thing.

    attr :nodes, true
    attr :edges, true
    attr :optimal_distance, true
    attr :temperature, true
    attr :iterations, true

    def initialize
      @nodes = []
      @edges = []
      @optimal_distance = 20
      @temperature = 5
      @iterations = 50
    end

    def draw
      for i in 0..@iterations
        repulse
        attract
        limit
      end
    end

    # calculate repulsive forces (each vertex times each vertex)
    def repulse
      @nodes.each do |outer_node|
        outer_node.disposition = Coordinates.new(0, 0)
        @nodes.each do |inner_node|
          delta_x = inner_node.position.x - outer_node.position.x
          delta_y = inner_node.position.y - outer_node.position.y

          norm = normal(delta_x, delta_y)

          if 0 < norm && 2 * @optimal_distance > norm
            repulsion = repulsive_force(norm)
            outer_node.disposition.x += (delta_x / norm) * repulsion
            outer_node.disposition.y += (delta_y / norm) * repulsion
          end
        end
      end
    end

    # calculate attractive forces (each edge)
    def attract
      @edges.each do |edge|
        delta_x = edge.end.position.x - edge.beginning.position.x
        delta_y = edge.end.position.y - edge.beginning.position.y

        norm = normal(delta_x, delta_y)

        if 0 < norm && 1.5 * @optimal_distance < norm
          attraction = attractive_force(norm)
          if edge.end.disposition.nil? # wtf?
            edge.end.disposition = Coordinates.new(0, 0)
          else
            edge.end.disposition.x -= (delta_x * norm) / attraction
            edge.end.disposition.y -= (delta_y * norm) / attraction
          end
          edge.beginning.disposition.x += (delta_x * norm) / attraction
          edge.beginning.disposition.y += (delta_y * norm) / attraction
        end
      end
    end

    # limit displacement (each vertex)
    def limit
      @nodes.each do |node|
        norm = normal(node.disposition.x, node.disposition.y)
        if 0 < norm
          node.position.x += (node.disposition.x / norm) * [norm, @temperature].min
          node.position.y += (node.disposition.y / norm) * [norm, @temperature].min
        end
      end
    end

    def attractive_force(distance)
      (distance ** 2) / @optimal_distance
    end

    def repulsive_force(distance)
      -(@optimal_distance ** 2) / distance
    end

    def normal(x, y)
      Math.sqrt(x ** 2 + y ** 2)
    end

    # cooling method to decrease temperature as graph solidifies...to-do?

  end
end

