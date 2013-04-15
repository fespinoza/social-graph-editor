source 'https://rubygems.org'

gem 'rails', '3.2.13'
gem 'ember-rails'
gem 'jquery-rails'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'therubyracer', :platforms => :ruby
  gem 'uglifier', '>= 1.0.3'
  gem 'bootstrap-sass'        # use bootstrap in rails with sass
end

group :development do
  gem 'better_errors'       # awesome errors page
  gem 'binding_of_caller'   # for better errors live console work
  gem 'meta_request'        # to enable the chrome rails panel
  gem 'pry'                 # awesome replacement of irb
end

group :development, :test do
  gem 'sqlite3'
end

group :production do
  gem 'pg'
end