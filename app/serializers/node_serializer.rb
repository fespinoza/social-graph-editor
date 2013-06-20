class NodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :social_network_id, :x, :y, :kind
  embed :ids, include: true
  has_many :families
  has_many :actor_roles, root: :roles
  has_many :relation_roles, root: :roles
  has_many :node_attributes
end
