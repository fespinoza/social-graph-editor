class UsersController < ApplicationController
  skip_before_filter :authenticate
  respond_to :json

  def login
    params[:user][:password] = User.encript(params[:user][:password])
    respond_with User.where(params[:user]).first
  end

  def show
    respond_with User.find(params[:id]) 
  end

  def create
    respond_with User.create(params[:user]) 
  end
end
