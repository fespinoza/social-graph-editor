class UsersController < ApplicationController
  respond_to :json

  def login
    params[:user][:password] = User.encrypt(params[:user][:password])
    respond_with User.where(params[:user]).first
    # TODO: solve case when no user is found
  end

  def show
    respond_with User.find(params[:id]) 
  end

  def create
    params[:user].delete(:new_password)
    user = User.create(params[:user])
    respond_with user do |format|
      format.json { render json: user.to_json }
    end
  end

  def update
    user = User.find(params[:id])
    if user.password == User.encrypt(params[:user][:password])
      new_password = User.encrypt(params[:user][:new_password])
      user.update_attributes({ 
        email: params[:user][:email], password: new_password 
      })
      respond_with user
    else
      head :unauthorized
    end
  end
end
