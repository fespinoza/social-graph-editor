class RolesController < ApplicationController
  respond_to :json
  before_filter :authenticate

  def index
    respond_with Role.find(params[:ids])
  end

  def show
    respond_with Role.find(params[:id])
  end

  def create
    respond_with Role.create(params[:role])
  end

  def update
    respond_with Role.update(params[:id], params[:role])
  end

  def destroy
    respond_with Role.destroy(params[:id])
  end
end
