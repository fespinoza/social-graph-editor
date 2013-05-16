class FamilySerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name, :color, :kind, :social_network_id
  has_many :nodes
end
