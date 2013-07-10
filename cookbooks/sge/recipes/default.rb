include_recipe 'apt'

package 'curl'
package 'git-core'
package 'vim'

package 'build-essential'
package 'libshadow-ruby1.8'
package 'libxml2-dev' # for nokogiri
package 'libxslt-dev' # for nokogiri
package 'libqt4-dev' # for capybara-webkit

bootstrap_rc 'sge' do
  user node['user']
  action :setup
end

## Rbenv
# install rbenv
rbenv_source "install rbenv for user #{node['user']}" do
  user node['user']
  action :install
end

# install ruby
rbenv_ruby "install ruby with rbenv for user #{node['user']}" do
  user node['user']
  version node['ruby']['version']
  action :install
end

# install bundler
rbenv_gem "install bundler with rbenv for user #{node['user']}" do
  user node['user']
  ruby_version node['ruby']['version']
  gem_name 'bundler'
  action :install
end

# execute "set rbenv ruby as global version of ruby" do
#   command "rbenv global #{node['ruby']['version']}"
# end

include_recipe 'postgresql::server'
include_recipe 'postgresql::server_dev'

pg_user node['user'] do
  privileges :superuser => true, :createdb => true, :login => true
  password node['user']
end

pg_database node['user'] do
  owner node['user']
  encoding "utf8"
  template "template0"
  locale "en_US.UTF8"
end

pg_user "rails" do
  privileges :superuser => true, :createdb => true, :login => true
  password "rails"
end

pg_database 'rails' do
  owner 'rails'
  encoding "utf8"
  template "template0"
  locale "en_US.UTF8"
end

cookbook_file "/home/#{node['user']}/locale_fix.sql" do
  source 'locale_fix.sql'
  mode '0777'
  owner node['user']
  group node['user']
end

execute "locale fix" do
  user node['user']
  command "psql -a -f /home/#{node['user']}/locale_fix.sql"
end