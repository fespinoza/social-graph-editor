class SocialNetworksController < ApplicationController
  respond_to :json

  def index
    respond_with SocialNetwork.all
  end

  def show
    respond_with SocialNetwork.find(params[:id])
  end

  def create
    respond_with SocialNetwork.create(params[:social_network])
  end

  def update
    respond_with SocialNetwork.update(params[:id], params[:social_network])
  end

  def destroy
    respond_with SocialNetwork.destroy(params[:id])
  end
  
end
