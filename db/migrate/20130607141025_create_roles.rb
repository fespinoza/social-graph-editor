class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name
      t.references :actor
      t.references :relation
      t.references :social_network

      t.timestamps
    end
    add_index :roles, :actor_id
    add_index :roles, :relation_id
    add_index :roles, :social_network_id
  end
end
