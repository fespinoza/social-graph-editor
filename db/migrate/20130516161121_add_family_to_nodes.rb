class AddFamilyToNodes < ActiveRecord::Migration
  def change
    add_column :nodes, :family_id, :integer
    add_index :nodes, :family_id
  end
end
