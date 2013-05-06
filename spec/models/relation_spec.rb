require "spec_helper"

describe Relation do
  describe "actors amount validation" do
    it "adds an error if the relation doesn't have 2+ actors" do
      relation = Relation.new
      expect(relation).not_to be_valid
      expect(relation.errors.messages[:actors]).to include("it has to have at least 2 actors")
    end

    it "is valid with 2+ actors" do
      social_network = SocialNetwork.create(name: "Test")
      actors = [social_network.actors.create(name: "bob"), social_network.actors.create(name: 'alice')]
      relation = Relation.new(actors: actors)
      expect(relation.errors).to be_empty
    end
  end

  it "validates the presence of the social network id" do
    relation = Relation.new
    expect(relation).not_to be_valid
    expect(relation.errors.messages).to include(:social_network_id)
  end

  it "can be created given a social network and 2+ actors" do
    social_network = SocialNetwork.create(name: "test")
    relation = Relation.new(name: "knows")
    relation.social_network = social_network
    relation.actors = [
      social_network.actors.create(name: "Bob"),
      social_network.actors.create(name: "alice")
    ]
    expect(relation).to be_valid
    expect(relation.save).to be_true
  end

  it "is removed when its actors are all removed"
  it "is removed when it only remains 1 actor in it"
end
