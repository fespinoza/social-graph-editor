require "spec_helper"

describe SocialNetworkRDFDeserializer do
  let(:user) { User.create!(email: "dummy@example.com", password: "secret") }
  let(:deserializer) { SocialNetworkRDFDeserializer.new(user, content) }

  context "with a file with visual structure" do
    let(:content) { File.readlines("spec/data/Memorias_visual.n3").join('') }

    before :each do
      deserializer.deserialize!
    end

    it "does not change the colors of families" do
      family = Family.where(name: "Estudiante").first
      expect(family.color).to eq("#ff7f0e")
    end

    it "does not change node coordinates" do
      node = Node.where(name: "Felipe Espinoza").first
      expect(node.x).to eq(377)
    end
  end

  context "with a file without visual structure" do
    let(:content) { File.readlines("spec/data/Memorias.n3").join('') }

    before :each do
      deserializer.deserialize!
    end

    it "creates a social network with the right name" do
      expect(user.social_networks.last.name).to eq("Memorias")
    end

    it "creates 4 families" do
      social_network = SocialNetwork.last
      expect(social_network.families.count).to eq(4)
    end

    it "assings a color to each family" do
      expect(Family.last.color).not_to be_nil 
    end

    it "creates 3 nodes" do
      social_network = SocialNetwork.last
      expect(social_network.nodes.count).to eq(3)
    end

    it "creates 2 node attributes" do
      node = Node.where({name: "Felipe Espinoza"}).first
      expect(node.node_attributes.count).to eq(2)
    end

    it "correct assign keys and values to node attributes" do
      attr = NodeAttribute.where({ key: "Edad" }).first
      expect(attr.value).to eq("24")
    end

    it "assings positions to the nodes" do
      expect(Node.last.x).not_to be_nil
    end

    it "creates 2 roles" do
      social_network = SocialNetwork.last
      expect(social_network.roles.count).to eq(2)
    end
  end
end
