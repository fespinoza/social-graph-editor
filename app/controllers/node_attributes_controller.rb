class NodeAttributesController < ApplicationController
  respond_to :json

  def index
    respond_with NodeAttribute.find(params[:ids])
  end

  def show
    respond_with NodeAttribute.find(params[:id])
  end

  def create
    respond_with NodeAttribute.create(params[:node_attribute])
  end

  def update
    respond_with NodeAttribute.update(params[:id], params[:node_attribute])
  end

  def destroy
    respond_with NodeAttribute.destroy(params[:id])
  end
end
