class SocialNetworkSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name
  has_many :actors
end
