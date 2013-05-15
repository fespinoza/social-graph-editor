class AddScaleAndTranslationToSocialNetworks < ActiveRecord::Migration
  def change
    add_column :social_networks, :scale, :float, default: 1
    add_column :social_networks, :translation_x, :float, default: 0
    add_column :social_networks, :translation_y, :float, default: 0
  end
end
