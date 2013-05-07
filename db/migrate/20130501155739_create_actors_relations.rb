class CreateActorsRelations < ActiveRecord::Migration
  def change
    create_table :actors_relations do |t|
      t.references :actor
      t.references :relation
    end
  end
end
