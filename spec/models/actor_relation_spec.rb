require 'spec_helper'

describe ActorRelation do
  it "is deleted when the relation is delete" do
    social_network = create(:social_network)
    actors = [
      create(:actor, name: "actor 1", social_network: social_network),
      create(:actor, name: "actor 2", social_network: social_network),
    ]
    relation = build(:relation, name: "hired", social_network: social_network)
    relation.actors = actors
    relation.save

    expect(ActorRelation.count).to eq(2)
    relation.destroy
    expect(ActorRelation.count).to eq(0)
  end
end
