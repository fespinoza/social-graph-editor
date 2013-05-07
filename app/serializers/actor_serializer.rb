class ActorSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name, :social_network_id, :x, :y
  has_many :relations
end
