action :install do

  user_root = (new_resource.user == 'root') ? '/root' : "/home/#{new_resource.user}"

  bash "install gem for ruby #{new_resource.ruby_version} with rbenv for user #{new_resource.user}" do
    user new_resource.user
    group new_resource.user
    flags '-l'
    code "cd /tmp && rbenv local #{new_resource.ruby_version} && cd /tmp && rbenv exec gem install #{new_resource.gem_name} && rbenv rehash && rm -f /tmp/.rbenv-version"
    environment  ({'HOME' => user_root})
    # not_if "ls #{user_root}/.rbenv/versions | grep #{new_resource.ruby_version}"
  end

end
