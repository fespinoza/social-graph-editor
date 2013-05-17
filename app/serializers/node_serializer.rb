class NodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :social_network_id, :x, :y, :kind, :family_id
end
