class SocialNetwork < ActiveRecord::Base
  attr_accessible :name, :scale, :translation_x, :translation_y, :node_ids, :family_ids, :role_ids
  has_many :nodes, dependent: :destroy
  has_many :families, dependent: :destroy
  has_many :roles, dependent: :destroy
end
