class Actor < ActiveRecord::Base
  belongs_to :social_network
  attr_accessible :name, :x, :y, :social_network_id, :relation_ids
  has_and_belongs_to_many :relations, join_table: "actors_relations"
end
