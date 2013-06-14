class SocialNetwork < ActiveRecord::Base
  attr_accessible :name, :scale, :translation_x, :translation_y, :node_ids, :family_ids, :role_ids
  has_many :nodes
  has_many :families
  has_many :roles
end
