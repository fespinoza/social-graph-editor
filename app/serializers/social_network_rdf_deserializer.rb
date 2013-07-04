class SocialNetworkRDFDeserializer
  def initialize(user, data)
    @data = data
    @user = user
    initialize_graph
  end

  def initialize_graph
    @graph = RDF::Graph.new
    RDF::N3::Reader.new(@data).each do |statement|
      @graph << statement
    end
  end

  def deserialize!
    extract_vocabulary
    deserialize_social_network
    deserialize_families
    deserialize_nodes
    deserialize_node_families
    deserialize_roles
    deserialize_attributes
    @social_network
  end

  def extract_vocabulary
    md = @data.match(/@prefix\s+sn:\s+\<(?<vocabulary>.*)\>/)
    @sn = RDF::Vocabulary.new(md[:vocabulary])
  end

  def deserialize_social_network
    query = RDF::Query.new({
      social_network: { RDF.type  => @sn.socialNetwork, @sn.name => :name, }
    })
    result = query.execute(@graph).first
    @social_network = @user.social_networks.create!({ name: result.name.value })
  end

  def deserialize_families
    query = RDF::Query.new({
      family: {
        RDF.type  => @sn.family,
        @sn.name => :name,
        @sn.kind => :kind,
        @sn.color => :color,
      }
    })
    @families ||= {}
    query.execute(@graph).each do |result|
      @families[result.family.to_s] = @social_network.families.create({ 
        name: result.name.value,
        kind: result.kind.value,
        color: result.color.value
      })
    end
  end

  def deserialize_nodes
    query = RDF::Query.new({
      node: {
        RDF.type  => :type,
        @sn.name => :name,
        @sn.positionX => :x,
        @sn.positionY => :y,
      }
    })
    @nodes ||= {}
    query.execute(@graph).each do |result|
      @nodes[result.node.to_s] = @social_network.nodes.create({ 
        name: result.name.value,
        x: result.x.value,
        y: result.y.value,
        kind: result.type.to_s.match(/#(.*)/)[1].titleize
      })
    end
  end

  def deserialize_node_families
    query = RDF::Query.new({ node: {
      @sn.belongsToFamily => :family
    }})
    query.execute(@graph).each do |result|
      node = @nodes[result.node.to_s]
      family = @families[result.family.to_s]
      node.family_ids = node.family_ids + [family.id]
    end
  end

  def deserialize_roles
    q1 = RDF::Query.new({ actor: { RDF.type => @sn.actor, @sn.participatesAs => :role, } })
    q2 = RDF::Query.new({ role: { RDF.type => @sn.role, @sn.inRelation => :relation, @sn.name => :name }})
    r1 = q1.execute(@graph)
    r2 = q2.execute(@graph, solutions: r1)
    r2.each_solution do |solution|
      @social_network.roles.create!({
        name: solution.name.value,
        actor_id: @nodes[solution.actor.to_s].id,
        relation_id: @nodes[solution.relation.to_s].id,
      })
    end
  end

  def deserialize_attributes
    query = RDF::Query.new({ node: { RDF.type => :type, :predicate => :literal } })
    solutions = query.execute(@graph)
    solutions.filter! do |solution|
      kind = vocabulary_element_from_uri(solution.type).titleize
      predicateElement = vocabulary_element_from_uri(solution.predicate)
      (kind == "Actor" || kind == "Relation") && predicateElement.match(/attribute/)
    end
    solutions.each do |solution|
      predicate = vocabulary_element_from_uri(solution.predicate)
      key = predicate.match(/attribute(.*)/)[1]
      @nodes[solution.node.to_s].node_attributes.create({
        key: key,
        value: solution.literal.value,
      })
    end
  end

  def statements
    if @statements.nil?
      @statements = []
      @graph.each_statement do |statement|
        @statements << statement
      end
    end
    @statements
  end

  private

  def vocabulary_element_from_uri(uri)
    uri.to_s.match(/.*#(?<element>.*)$/)[:element]
  end
end
