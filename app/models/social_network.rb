class SocialNetwork < ActiveRecord::Base
  attr_accessible :name,
                  :scale,
                  :translation_x,
                  :translation_y,
                  :node_ids,
                  :family_ids,
                  :role_ids,
                  :user_id
  belongs_to :user
  has_many :nodes, dependent: :destroy
  has_many :families, dependent: :destroy
  has_many :roles, dependent: :destroy

  def uri(base = prefix)
    @uri ||= RDF::URI("#{base}/social_networks/#{id}")
  end

  # this is SO ugly :(
  def vocabulary
    url_helpers = Rails.application.routes.url_helpers
    if Rails.env.development?
      url_helpers.vocabulary_social_network_url(self, host: 'sn.dcc.uchile.cl')
    else
      url_helpers.vocabulary_social_network_url(self)
    end
  end

  def prefix
    "http://sn.dcc.uchile.cl/2013"
  end

end
