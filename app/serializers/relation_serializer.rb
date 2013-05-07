class RelationSerializer < ActiveModel::Serializer
  embed :ids, include: true
  has_many :actors
  attributes :id, :name
end
