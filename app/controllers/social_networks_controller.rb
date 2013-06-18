class SocialNetworksController < ApplicationController
  respond_to :json, :rdf

  def index
    authenticate
    respond_with social_networks
  end

  def show
    social_network = SocialNetwork.find(params[:id])
    respond_to do |format|
      format.json { render json: social_network }
      format.rdf { render text: social_network.to_rdf }
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
