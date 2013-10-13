class SocialNetworksController < ApplicationController
  respond_to :json, :rdf
  before_filter :authenticate, except: [:vocabulary]

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
    original.join!(imported, params[:equivalences])
    respond_with original
  end

  private

  def social_networks
    current_user.social_networks 
  end
  
end
