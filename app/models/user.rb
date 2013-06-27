class User < ActiveRecord::Base
  attr_accessible :email, :password, :token, :social_network_ids

  validates :email, uniqueness: true

  before_create :encript_password
  before_create :generate_access_token

  has_many :social_networks
  has_many :nodes, through: :social_networks
  has_many :families, through: :social_networks
  has_many :roles, through: :social_networks
  has_many :node_attributes, through: :nodes

  def self.encript(password)
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
