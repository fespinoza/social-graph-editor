class User < ActiveRecord::Base
  attr_accessible :email, :password, :token, :social_network_ids

  validates :email, uniqueness: true

  before_create :encrypt_password
  before_create :generate_access_token

  has_many :social_networks
  has_many :nodes, through: :social_networks
  has_many :families, through: :social_networks
  has_many :roles, through: :social_networks
  has_many :node_attributes, through: :nodes

  def self.encrypt(password)
    Digest::SHA2.hexdigest("EMBERAPPSGE123" + password)
  end

  def to_json
    {
      user: {
        token: self.token,
        email: self.email,
        id: self.id,
      }
    }.to_json
  end

  def password_reset!
    update_attribute(:password, User.encrypt(User.default_password))
  end

  def self.default_password
    "temp123"
  end

  private

  def encrypt_password
    self.password = User.encrypt(self.password)
  end

  def generate_access_token
    begin
      self.token = SecureRandom.hex
    end while User.where(token: token).exists?
  end
end
