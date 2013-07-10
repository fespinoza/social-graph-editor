action :install do

  user_root = (new_resource.user == 'root') ? '/root' : "/home/#{new_resource.user}"

  package 'git-core'
  package 'curl'
  package 'build-essential'
  package 'zlib1g-dev'
  package 'libssl-dev'
  if platform?('ubuntu')
    case node.platform_version
    when 10.04
      package 'libreadline5-dev'
      break
    when 12.04
      package 'libreadline-gplv2-dev'
      break
    end
  end

  bash "install ruby #{new_resource.version} with rbenv for user #{new_resource.user}" do
    user new_resource.user
    group new_resource.user
    flags '-l'
    code "rbenv install #{new_resource.version} && rbenv rehash"
    environment  ({'HOME' => user_root})
    not_if "ls #{user_root}/.rbenv/versions | grep #{new_resource.version}"
  end

end
