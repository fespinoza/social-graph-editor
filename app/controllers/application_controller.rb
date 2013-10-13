class ApplicationController < ActionController::Base
  protect_from_forgery

  protected

  def authenticate
    puts ">>>>>>> Authenticate!!"
    puts token = request.headers['HTTP_X_API_TOKEN'] || params[:token]
    begin
      if current_user.present? && current_user.token == token
        @current_user
      else
        @current_user = User.find_by_token!(token)
      end
    rescue Exception => e
      puts e.message
      # TODO: skip authorization only on appcontroller#index
      head :unauthorized unless token
    end
  end

  def current_user
    @current_user
  end
end
