require "spec_helper"

describe Relation do
  it "has at least 2 actors" do
    relation = Relation.new
    expect(relation).not_to be_valid
    expect(relation.errors.messages[:actors]).to include("it has to have at least 2 actors")
  end
end
