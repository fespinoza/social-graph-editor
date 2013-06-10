class RoleSerializer < ActiveModel::Serializer
  attributes :id, :name, :relation_id, :actor_id, :social_network_id
end
