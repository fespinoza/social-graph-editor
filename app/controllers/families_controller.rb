class FamiliesController < ApplicationController
  respond_to :json
  before_filter :authenticate

  def index
    respond_with Family.find(params[:ids])
  end

  def show
    respond_with Family.find(params[:id])
  end

  def create
    respond_with Family.create(params[:family])
  end

  def update
    respond_with Family.update(params[:id], params[:family])
  end

  def destroy
    respond_with Family.destroy(params[:id])
  end
end
