class CreateActors < ActiveRecord::Migration
  def change
    create_table :actors do |t|
      t.string :name
      t.integer :x
      t.integer :y
      t.references :social_network

      t.timestamps
    end
    add_index :actors, :social_network_id
  end
end
