class SocialNetwork < ActiveRecord::Base
  attr_accessible :name,
                  :scale,
                  :translation_x,
                  :translation_y,
                  :node_ids,
                  :family_ids,
                  :role_ids,
                  :user_id
  belongs_to :user
  has_many :nodes, dependent: :destroy
  has_many :families, dependent: :destroy
  has_many :roles, dependent: :destroy

  include RDF::Enumerable
  def each
    prefix = "#{self.prefix}/vocab"
    sn = {
      node: RDF::URI("#{prefix}#node"),
      role: RDF::URI("#{prefix}#role"),
      family: RDF::URI("#{prefix}#family"),
      actor: RDF::URI("#{prefix}#actor"),
      relation: RDF::URI("#{prefix}#relation"),
      kind: RDF::URI("#{prefix}#kind"),
      belongsToFamily: RDF::URI("#{prefix}#belongs-to-family"),
    }

    yield RDF::Statement.new(self.uri, RDF::FOAF.name, self.name)

    self.nodes.each do |node|
      yield RDF::Statement.new(node.uri, RDF.type, sn[:node])
      yield RDF::Statement.new(node.uri, RDF::FOAF.name, node.name)
      yield RDF::Statement.new(node.uri, sn[:kind], sn[node.kind.downcase.to_sym])

      node.families.each do |family|
        yield RDF::Statement.new(node.uri, sn[:belongsToFamily], family.uri)
      end

      node.node_attributes.each do |attribute|
        key = RDF::URI("#{prefix}/attribute##{attribute.key}")
        yield RDF::Statement.new(node.uri, key, attribute.value)
      end
    end

    self.roles.each do |role|
      yield RDF::Statement.new(role.uri, RDF.type, sn[:role])
      yield RDF::Statement.new(role.uri, RDF::FOAF.name, role.name)
      yield RDF::Statement.new(role.actor.uri, role.uri, role.relation.uri)
    end

    self.families.each do |family|
      yield RDF::Statement.new(family.uri, RDF.type, sn[:family])
      yield RDF::Statement.new(family.uri, RDF::FOAF.name, family.name)
      yield RDF::Statement.new(family.uri, sn[:kind], sn[family.kind.downcase.to_sym])
    end
  end

  def uri
    @uri ||= RDF::URI("#{self.prefix}/social-networks/#{self.id}")
  end

  def prefix
    "http://sn.dcc.uchile.cl/2013"
  end

  def to_rdf
    self.dump(:ntriples)
  end
end
