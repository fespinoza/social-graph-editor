require "rdf"
require "rdf/n3"

class SocialNetworkRDFSerializer
  
  def initialize(social_network)
    @social_network = social_network
  end

  def to_rdf
    base = options[:base_uri]
    writer = RDF::Writer.open('a.n3', options) do |writer|
      writer << RDF::Statement.new(@social_network.uri(base), prefix(:foaf, :name), @social_network.name)

      @social_network.nodes.each do |node|
        node_uri = node.uri(base)
        writer << RDF::Statement.new(node_uri, RDF.type, sn(:node))
        writer << RDF::Statement.new(node_uri, prefix(:foaf, :name), node.name)
        writer << RDF::Statement.new(node_uri, sn(:kind), sn(node.kind.downcase))

        node.families.each do |family|
          writer << RDF::Statement.new(node_uri, sn(:belongsToFamily), family.uri(base))
        end

        node.node_attributes.each do |attribute|
          key = prefix(:sna, attribute.key)
          writer << RDF::Statement.new(node_uri, key, attribute.value)
        end
      end

      @social_network.roles.each do |role|
        role_uri = role.uri(base)
        writer << RDF::Statement.new(role_uri, RDF.type, sn(:role))
        writer << RDF::Statement.new(role_uri, RDF::FOAF.name, role.name)
        writer << RDF::Statement.new(role.actor.uri(base), role_uri, role.relation.uri(base))
      end

      @social_network.families.each do |family|
        family_uri = family.uri(base)
        writer << RDF::Statement.new(family_uri, RDF.type, sn(:family))
        writer << RDF::Statement.new(family_uri, prefix(:foaf, :name), family.name)
        writer << RDF::Statement.new(family_uri, sn(:kind), sn(family.kind.downcase))
      end
    end
  end

  def uri
   base("social_network/#{@social_network.id}/") 
  end

  def base(content)
    options[:base_uri] + content.to_s
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
        foaf: RDF::FOAF.to_uri,
        sn: RDF::URI("http://sn.dcc.uchile.cl/v1/vocab#"),
        sna: RDF::URI("http://sn.dcc.uchile.cl/v1/vocab/attributes#"),
      }
    }
  end

end
            
      
