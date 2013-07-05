class UsersController < ApplicationController
  skip_before_filter :authenticate
  respond_to :json

  def login
    params[:user][:password] = User.encript(params[:user][:password])
    respond_with User.where(params[:user]).first
    # TODO: solve case when no user is found
  end

  def show
    respond_with User.find(params[:id]) 
  end

  def create
    user = User.create(params[:user])
    respond_with user do |format|
      format.json { render json: user.to_json }
    end
  end
end
