class CreateRelations < ActiveRecord::Migration
  def change
    create_table :relations do |t|
      t.string :name
      t.references :social_network

      t.timestamps
    end
  end
end
