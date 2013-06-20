class NodeAttribute < ActiveRecord::Base
  belongs_to :node
  attr_accessible :key, :value
end
