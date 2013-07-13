# encoding: utf-8
require "spec_helper"

describe "Social Networks Join API" do

  describe "POST join" do
    let(:original_content) { File.readlines("spec/data/Memorias_visual.n3").join('') }
    let(:imported_content) { File.readlines("spec/data/Memorias_externas.n3").join('') }
    let(:user) { User.create!(email: "dummy@example.com", password: "secret") }
    let(:original) { SocialNetworkRDFDeserializer.new(user, original_content).deserialize! }
    let(:imported) { SocialNetworkRDFDeserializer.new(user, imported_content).deserialize! }
    let(:equivalences) { 
      {
        imported_family("amigoDe").id      => nil,
        imported_family("alumnoDCC").id    => original_family("Estudiante").id,
        imported_family("profesorDCC").id  => original_family("Académico").id,
        imported_family("memoria").id      => original_family("projectoDeMemoria").id,
        imported_family("profesorGuía").id => original_family("Académico").id,
      }
    }

    context "successful case" do
      before :each do
        @result = post 'social_networks/join.json', {
          token: user.token,
          original_id: original.id,
          imported_id: imported.id,
          equivalences: equivalences,
        }
      end

      it "adds all the families without equivalence to the original social network" do
        expect(imported_family("amigoDe").social_network).to eq(original)
      end

      it "assings to the imported nodes the original families equivalent to the imported" do
        expect(original_family("Académico").nodes.count).to eq(4)
      end

      it "deletes the imported families that had equivalences" do
        expect(Family.count).to eq(5)
      end

      it "adds all the nodes from the imported social network to the original" do
        original.reload
        expect(original.nodes.count).to eq(11)
      end

      it "adds all the imported roles to the original network" do
        original.reload
        expect(original.roles.count).to eq(8)
      end

      it "deletes the imported social network" do
        expect(SocialNetwork.count).to eq(1)
        expect(SocialNetwork.first).to eq(original)
      end

      def imported_family(name)
        family_from_social_network(imported, name)
      end

      def original_family(name)
        family_from_social_network(original, name)
      end

      def family_from_social_network(social_network, name)
        family = social_network.families.select do |family|
          family.name == name
        end.first
        family.reload
      end
    end
  end


end
