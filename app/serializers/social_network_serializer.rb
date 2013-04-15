class SocialNetworkSerializer < ActiveModel::Serializer
  attributes :id, :name, :actor_ids
end
