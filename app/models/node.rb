class Node < ActiveRecord::Base
  belongs_to :social_network

  has_many :actor_roles, class_name: "Role", foreign_key: "actor_id"
  has_many :relation_roles, class_name: "Role", foreign_key: "relation_id"
  has_and_belongs_to_many :families
  has_many :node_attributes, dependent: :destroy

  attr_accessible :name, :x, :y, :social_network_id, :kind, :family_ids, :actor_role_ids, :relation_role_ids

  def roles
    if is_actor?
      actor_roles
    else
      relation_roles
    end
  end

  def roles=(new_roles)
    if is_actor?
      actor_roles = new_roles
    else
      relation_roles = new_roles
    end
  end

  def is_actor?
    kind == "Actor"
  end

  def is_relation?
    kind == "Relation"
  end
end
