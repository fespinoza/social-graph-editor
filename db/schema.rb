# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130620211651) do

  create_table "attributes", :force => true do |t|
    t.integer  "node_id"
    t.string   "key"
    t.string   "value"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "attributes", ["node_id"], :name => "index_attributes_on_node_id"

  create_table "families", :force => true do |t|
    t.string   "name"
    t.string   "color"
    t.string   "kind"
    t.integer  "social_network_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  create_table "families_nodes", :force => true do |t|
    t.integer "node_id"
    t.integer "family_id"
  end

  create_table "node_attributes", :force => true do |t|
    t.integer  "node_id"
    t.string   "key"
    t.string   "value"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "node_attributes", ["node_id"], :name => "index_node_attributes_on_node_id"

  create_table "nodes", :force => true do |t|
    t.string   "name"
    t.integer  "x"
    t.integer  "y"
    t.integer  "social_network_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "kind"
  end

  add_index "nodes", ["social_network_id"], :name => "index_nodes_on_social_network_id"

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.integer  "actor_id"
    t.integer  "relation_id"
    t.integer  "social_network_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "roles", ["actor_id"], :name => "index_roles_on_actor_id"
  add_index "roles", ["relation_id"], :name => "index_roles_on_relation_id"
  add_index "roles", ["social_network_id"], :name => "index_roles_on_social_network_id"

  create_table "social_networks", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.float    "scale",         :default => 1.0
    t.float    "translation_x", :default => 0.0
    t.float    "translation_y", :default => 0.0
  end

end
