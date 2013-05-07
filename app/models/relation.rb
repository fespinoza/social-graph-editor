class Relation < ActiveRecord::Base
  attr_accessible :name, :actors, :social_network_id
  belongs_to :social_network
  has_and_belongs_to_many :actors, join_table: "actors_relations"

  #validates :social_network_id, presence: true
  #validate :has_at_least_2_actors

  private

  def has_at_least_2_actors
    if self.actors.length < 2
      self.errors[:actors] << "it has to have at least 2 actors"
    end  
  end
end
