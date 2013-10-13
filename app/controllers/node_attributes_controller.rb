class NodeAttributesController < ApplicationController
  respond_to :json
  before_filter :authenticate

  def index
    nodes = NodeAttribute.find(params[:ids]) rescue NodeAttribute.all
    respond_with nodes
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
