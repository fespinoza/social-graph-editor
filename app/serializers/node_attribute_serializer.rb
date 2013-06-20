class NodeAttributeSerializer < ActiveModel::Serializer
  attributes :key, :value, :node_id
end
