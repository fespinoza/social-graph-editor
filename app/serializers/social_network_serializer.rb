class SocialNetworkSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name
  has_many :actors
  has_many :relations
end
