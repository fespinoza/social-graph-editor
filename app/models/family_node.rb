class FamilyNode < ActiveRecord::Base
  self.table_name = "families_nodes"
  belongs_to :family
  belongs_to :node
end
