class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name
      t.references :actor
      t.references :relation

      t.timestamps
    end
    add_index :roles, :actor_id
    add_index :roles, :relation_id
  end
end
