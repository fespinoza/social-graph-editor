class AddUserIdToSocialNetworks < ActiveRecord::Migration
  def change
    add_column :social_networks, :user_id, :integer
    add_index :social_networks, :user_id
  end
end
