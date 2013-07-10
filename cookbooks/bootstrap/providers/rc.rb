action :setup do
  ['bashrc', 'gemrc', 'irbrc', 'gitconfig'].each do |file_name|
    cookbook_file "/home/#{new_resource.user}/.#{file_name}" do
      cookbook 'bootstrap'
      source file_name
      owner new_resource.user
      group new_resource.user
      mode 0644
    end
  end
end
