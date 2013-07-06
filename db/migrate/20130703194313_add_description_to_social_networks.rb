class AddDescriptionToSocialNetworks < ActiveRecord::Migration
  def change
    add_column :social_networks, :description, :string, default: ""
  end
end
