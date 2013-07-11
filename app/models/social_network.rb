class SocialNetwork < ActiveRecord::Base
  attr_accessible :name,
                  :scale,
                  :translation_x,
                  :translation_y,
                  :node_ids,
                  :family_ids,
                  :role_ids,
                  :user_id,
                  :description
  belongs_to :user
  has_many :nodes, dependent: :destroy
  has_many :node_attributes, through: :nodes
  has_many :families, dependent: :destroy
  has_many :roles, dependent: :destroy

  def uri(base = prefix)
    @uri ||= RDF::URI("#{base}/social_networks/#{id}")
  end

  # TODO: fix this is SO ugly :(
  def self.vocabulary
    url_helpers = Rails.application.routes.url_helpers
    if Rails.env.production?
      url_helpers.vocabulary_url(host: 'social-graph-editor.heroku.com')
    else
      url_helpers.vocabulary_url(host: 'sn2.dcc.uchile.cl')
    end
  end

  def prefix
    "http://sn.dcc.uchile.cl/2013"
  end

end
