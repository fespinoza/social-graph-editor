class RelationSerializer < ActiveModel::Serializer
  embed :ids
  has_many :actors
  attributes :id, :name
end
