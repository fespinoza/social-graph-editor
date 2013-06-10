class NodeSerializer < ActiveModel::Serializer
  attributes :id, :name, :social_network_id, :x, :y, :kind, :family_id
  embed :ids, include: true
  has_many :actor_roles, root: :roles
  has_many :relation_roles, root: :roles
end
