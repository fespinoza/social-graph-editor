class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.string :name
      t.string :color
      t.string :kind
      t.references :social_network

      t.timestamps
    end
  end
end
