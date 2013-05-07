class ActorRelation < ActiveRecord::Base
  set_table_name "actors_relations"
  attr_accessible :actor, :relation
  belongs_to :actor
  belongs_to :relation
end
