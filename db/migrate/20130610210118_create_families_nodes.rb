class CreateFamiliesNodes < ActiveRecord::Migration
  def change
    create_table :families_nodes do |t|
      t.references :node
      t.references :family
    end
  end
end
