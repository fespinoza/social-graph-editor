class Node < ActiveRecord::Base
  belongs_to :social_network
  belongs_to :family
  attr_accessible :name, :x, :y, :social_network_id, :kind, :family_id
end
