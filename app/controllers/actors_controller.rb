class ActorsController < ApplicationController
  respond_to :json

  def index
    respond_with Actor.find(params[:ids])
  end

  def show
    respond_with Actor.find(params[:id])
  end

  def create
    respond_with Actor.create(params[:actor])
  end

  def update
    respond_with Actor.update(params[:id], params[:actor])
  end

  def destroy
    respond_with Actor.destroy(params[:id])
  end
end