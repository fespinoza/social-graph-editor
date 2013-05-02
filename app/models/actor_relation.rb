class ActorRelation < ActiveRecord::Base
  attr_accessible :actor, :relation
  belongs_to :actor
  belongs_to :relation
end
