class NodeAttributeSerializer < ActiveModel::Serializer
  attributes :id, :key, :value, :node_id
end
