class ActorSerializer < ActiveModel::Serializer
  attributes :id, :name, :social_network_id, :x, :y
end
