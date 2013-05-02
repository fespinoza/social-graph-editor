class SocialNetwork < ActiveRecord::Base
  attr_accessible :name
  has_many :actors
  has_many :relations
end
