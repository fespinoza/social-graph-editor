class CreateActorRelations < ActiveRecord::Migration
  def change
    create_table :actor_relations do |t|
      t.references :actor
      t.references :relation

      t.timestamps
    end
  end
end
