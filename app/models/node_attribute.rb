class NodeAttribute < ActiveRecord::Base
  belongs_to :node
  attr_accessible :key, :value, :node_id

  def uri(base = node.social_network.prefix)
    @uri ||= node.social_network.uri(base) + "/attributes/#{id}"
  end
end
