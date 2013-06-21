class CreateNodeAttributes < ActiveRecord::Migration
  def change
    create_table :node_attributes do |t|
      t.references :node
      t.string :key
      t.string :value

      t.timestamps
    end
    add_index :node_attributes, :node_id
  end
end
