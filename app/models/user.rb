class User < ActiveRecord::Base
  attr_accessible :email, :password, :token

  # TODO: email has to be unique

  before_create :encript_password
  before_create :generate_access_token

  private

  def encript_password
    self.password = Digest::SHA2.hexdigest("EMBERAPPSGE123" + self.password)
  end

  def generate_access_token
    begin
      self.token = SecureRandom.hex
    end while User.where(token: token).exists?
  end
end
