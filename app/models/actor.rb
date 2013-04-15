class Actor < ActiveRecord::Base
  belongs_to :social_network
  attr_accessible :name, :x, :y
end
