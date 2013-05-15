class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.string :name
      t.integer :x
      t.integer :y
      t.references :social_network

      t.timestamps
    end
    add_index :nodes, :social_network_id
  end
end
