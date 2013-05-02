EmberSge::Application.routes.draw do
  resources :social_networks
  resources :actors
  resources :relations
  root to: "application#index"
end
