class SocialNetworksController < ApplicationController
  respond_to :json, :rdf
  skip_before_filter :authenticate, only: :vocabulary

  def index
    authenticate
    respond_with social_networks
  end

  def show
    social_network = social_networks.find(params[:id])
    respond_with social_network do |format|
      format.rdf do
        serializer = SocialNetworkRDFSerializer.new(social_network, params[:visual_data])
        render text: serializer.to_rdf
      end
    end
  end

  def create
    respond_with social_networks.create(params[:social_network])
  end

  def update
    respond_with social_networks.update(params[:id], params[:social_network])
  end

  def destroy
    respond_with social_networks.destroy(params[:id])
  end

  def vocabulary
  end

  def import
    deserializer = SocialNetworkRDFDeserializer.new(current_user, params[:content])
    social_network = deserializer.deserialize!
    respond_with social_network
  end

  def join
    original = current_user.social_networks.find(params[:original_id])
    imported = current_user.social_networks.find(params[:imported_id])
    params[:equivalences].each_pair do |imported_family_id, original_family_id|
      if original_family_id
        imported_family = Family.find(imported_family_id)
        original_family = Family.find(original_family_id)

        imported_family.nodes.each do |node|
          node.families << original_family unless node.families.include?(original_family)
          node.save!
        end

        imported_family.destroy

      else
        family = Family.find(imported_family_id)
        family.social_network = original
        family.save!
      end
    end

    imported.nodes.each do |node|
      node.social_network = original
      node.save!
    end

    imported.roles.each do |role|
      role.social_network = original
      role.save!
    end

    imported.reload
    imported.destroy

    respond_with original
  end

  private

  def social_networks
    current_user.social_networks 
  end
  
end
