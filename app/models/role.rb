class Role < ActiveRecord::Base
  belongs_to :actor, class_name: "Node", foreign_key: "actor_id", conditions: "kind = 'Actor'"
  belongs_to :relation, class_name: "Node", foreign_key: "relation_id", conditions: "kind = 'Relation'"
  belongs_to :social_network
  attr_accessible :name, :actor_id, :relation_id, :social_network_id

  def uri(base = social_network.prefix)
    @uri ||= social_network.uri(base) + "/roles/#{id}"
  end
end
