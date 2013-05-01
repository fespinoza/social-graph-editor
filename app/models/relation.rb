class Relation < ActiveRecord::Base
  attr_accessible :name
  has_and_belongs_to_many :actors

  validate :has_at_least_2_actors

  private

  def has_at_least_2_actors
    if self.actors.count < 2
      self.errors[:actors] << "it has to have at least 2 actors"
    end  
  end
end
