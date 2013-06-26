class User < ActiveRecord::Base
  attr_accessible :email, :password, :token

  # TODO: email has to be unique

  before_create :encript_password
  before_create :generate_access_token

  has_many :social_networks

  def self.encript(password)
    Digest::SHA2.hexdigest("EMBERAPPSGE123" + password)
  end

  private

  def encript_password
    self.password = User.encript(self.password)
  end

  def generate_access_token
    begin
      self.token = SecureRandom.hex
    end while User.where(token: token).exists?
  end
end
