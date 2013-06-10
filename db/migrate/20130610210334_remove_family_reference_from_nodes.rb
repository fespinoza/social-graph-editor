class RemoveFamilyReferenceFromNodes < ActiveRecord::Migration
  def up
    remove_column :nodes, :family_id
  end

  def down
    add_column :nodes, :family_id, :integer
  end
end
