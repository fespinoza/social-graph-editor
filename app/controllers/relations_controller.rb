class RelationsController < ApplicationController
  respond_to :json

  def index
    respond_with Relation.find(params[:ids])
  end

  def show
    respond_with Relation.find(params[:id])
  end

  def create
    respond_with Relation.create(params[:relation])
  end

  def update
    respond_with Relation.update(params[:id], params[:relation])
  end

  def destroy
    respond_with Relation.destroy(params[:id])
  end
end
