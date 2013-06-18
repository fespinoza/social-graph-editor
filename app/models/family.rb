class Family < ActiveRecord::Base
  belongs_to :social_network
  has_and_belongs_to_many :nodes
  attr_accessible :color, :kind, :name, :social_network_id, :node_ids

  def uri
    @uri ||= RDF::URI("http://dcc.uchile.cl/#{social_network.id}/families/#{self.id}")
  end
end
