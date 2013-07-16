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

  def join!(imported, equivalences)
    equivalences.each_pair do |imported_family_id, original_family_id|
      imported_family = Family.find(imported_family_id)
      if original_family_id.nil? or original_family_id.empty?
        imported_family.update_attribute(:social_network, self)
      else
        original_family = Family.find(original_family_id)
        imported_family.nodes.each do |node|
          unless node.families.include?(original_family)
            node.families << original_family 
            node.save!
          end
        end
        imported_family.destroy
      end
    end

    imported.nodes.each do |node|
      node.update_attribute(:social_network, self)
    end

    imported.roles.each do |role|
      role.update_attribute(:social_network, self)
    end

    imported.reload.destroy
  end

end
