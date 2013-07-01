class SocialNetworksController < ApplicationController
  respond_to :json, :rdf

  def index
    authenticate
    respond_with social_networks
  end

  def show
    social_network = social_networks.find(params[:id])
    respond_with social_network do |format|
      format.rdf { render text: SocialNetworkRDFSerializer.new(social_network).to_rdf }
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

  private

  def social_networks
    current_user.social_networks 
  end
  
end
