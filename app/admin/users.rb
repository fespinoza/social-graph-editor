ActiveAdmin.register User do
  index do
    column :id
    column :email
    column :token
    default_actions
    column "Extra Actions" do |user|
      link_to "Reset Password", password_reset_admin_user_path(user), method: :post
    end
  end

  member_action :password_reset, method: :post do
    @user = User.find(params[:id])
    @user.password_reset!
    redirect_to admin_users_path, flash: { notice: "User '#{@user.email}' password reset to '#{User.default_password}'"}
  end
end
