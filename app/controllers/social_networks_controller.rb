class SocialNetworksController < ApplicationController
  respond_to :json

  def index
    authenticate
    respond_with social_networks
  end

  def show
    respond_with social_networks.find(params[:id])
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
