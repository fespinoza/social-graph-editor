class Family < ActiveRecord::Base
  belongs_to :social_network
  attr_accessible :color, :kind, :name, :social_network_id
end
