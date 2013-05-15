class SocialNetworkSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name, :scale, :translation_x, :translation_y
  has_many :nodes, :families
end
