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
    sn = {
      family: RDF::URI("http://dcc.uchile.cl/vocab#family"),
      actor: RDF::URI("http://dcc.uchile.cl/vocab#actor"),
      relation: RDF::URI("http://dcc.uchile.cl/vocab#relation"),
      kind: RDF::URI("http://dcc.uchile.cl/vocab#kind"),
    }

    yield RDF::Statement.new(self.uri, RDF::FOAF.name, self.name)

    self.nodes.each do |node|
      yield RDF::Statement.new(node.uri, RDF::FOAF.name, node.name)
      yield RDF::Statement.new(node.uri, sn[:kind], sn[node.kind.downcase.to_sym])

      node.families.each do |family|
        yield RDF::Statement.new(node.uri, sn[:family], family.uri)
      end
    end

    self.roles.each do |role|
      yield RDF::Statement.new(role.actor.uri, role.uri, role.relation.uri)
      yield RDF::Statement.new(role.uri, RDF::FOAF.name, role.name)
    end

    self.families.each do |family|
      yield RDF::Statement.new(family.uri, RDF::FOAF.name, family.name)
      yield RDF::Statement.new(family.uri, sn[:kind], sn[family.kind.downcase.to_sym])
    end
  end

  def uri
    @uri ||= RDF::URI("http://dcc.uchile.cl/#{id}")
  end

  def to_rdf
    self.dump(:ntriples)
  end
end
