ActiveAdmin.register SocialNetwork do
  index do
    column :id
    column :name
    column "Node Count" do |social_network|
      social_network.nodes.count
    end
    column "Roles Count" do |social_network|
      social_network.roles.count
    end
    column "Families Count" do |social_network|
      social_network.families.count
    end
    column "User" do |social_network|
      link_to social_network.user.email, admin_user_path(social_network.user) if social_network.user
    end
    default_actions
  end
end
