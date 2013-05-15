class FamilySerializer < ActiveModel::Serializer
  attributes :id, :name, :color, :kind, :social_network_id
end
