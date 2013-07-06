require "rdf"
require "rdf/n3"

class SocialNetworkRDFSerializer
  
  def initialize(social_network, include_visual_data = false)
    @social_network = social_network
    @include_visual_data = include_visual_data
  end

  def to_rdf
    base = options[:base_uri]
    RDF::Writer.for(:n3).buffer(options) do |writer|

      writer << RDF::Statement.new(@social_network.uri(base), prefix(:rdf, :type), sn(:socialNetwork))
      writer << RDF::Statement.new(@social_network.uri(base), sn(:name), @social_network.name)
      # TODO: remove this line when update the DB 
      if @social_network.description
        writer << RDF::Statement.new(@social_network.uri(base), prefix(:dc, :description), @social_network.description)
      end

      @social_network.nodes.each do |node|
        node_uri = node.uri(base)
        writer << RDF::Statement.new(node_uri, prefix(:rdf, :type), sn(node.kind.downcase))
        writer << RDF::Statement.new(node_uri, sn(:name), node.name)
        writer << RDF::Statement.new(node_uri, sn(:kind), node.kind)

        if visual_data?
          writer << RDF::Statement.new(node_uri, sn(:positionX), node.x)
          writer << RDF::Statement.new(node_uri, sn(:positionY), node.y)
        end

        node.families.each do |family|
          writer << RDF::Statement.new(node_uri, sn(:belongsToFamily), family.uri(base))
        end

        node.node_attributes.each do |attribute|
          # TODO: eliminar acentos
          key = prefix(:sn, "attribute#{attribute.key.titleize.gsub(/\s+/, '')}")
          writer << RDF::Statement.new(node_uri, key, attribute.value)
        end
      end

      @social_network.roles.each do |role|
        role_uri = role.uri(base)
        writer << RDF::Statement.new(role_uri, prefix(:rdf, :type), sn(:role))
        writer << RDF::Statement.new(role_uri, sn(:name), role.name)
        writer << RDF::Statement.new(role.actor.uri(base), sn(:participatesAs), role_uri)
        writer << RDF::Statement.new(role_uri, sn(:inRelation), role.relation.uri(base))
      end

      @social_network.families.each do |family|
        family_uri = family.uri(base)
        writer << RDF::Statement.new(family_uri, prefix(:rdf, :type), sn(:family))
        writer << RDF::Statement.new(family_uri, sn(:name), family.name)
        writer << RDF::Statement.new(family_uri, sn(:kind), family.kind)

        if visual_data?
          writer << RDF::Statement.new(family_uri, sn(:color), family.color)
        end
      end
    end
  end

  def visual_data?
    @include_visual_data
  end

  def sn(content)
    prefix(:sn, content)
  end

  def prefix(name, content)
    options[:prefixes][name.to_sym] + content.to_s 
  end

  def options
    @options ||= {
      base_uri: RDF::URI("http://sn.dcc.uchile.cl/2013/"),
      prefixes: {
        rdf: RDF.to_uri,
        rdfs: RDF::RDFS.to_uri,
        sn: RDF::URI("#{@social_network.vocabulary}#"),
        dc: RDF::DC.to_uri,
      }
    }
  end

end
