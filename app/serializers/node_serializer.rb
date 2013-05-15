class NodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :social_network_id, :x, :y, :kind
end
