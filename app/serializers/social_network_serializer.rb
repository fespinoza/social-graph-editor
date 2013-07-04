class SocialNetworkSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :name, :scale, :translation_x, :translation_y, :user_id, :description
  has_many :nodes
  has_many :families
  has_many :roles
end
