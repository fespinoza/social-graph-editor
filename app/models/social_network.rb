class SocialNetwork < ActiveRecord::Base
  attr_accessible :name, :scale, :translation_x, :translation_y
  has_many :nodes
  has_many :families
end
