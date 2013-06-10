EmberSge::Application.routes.draw do
  resources :social_networks
  resources :nodes
  resources :families
  resources :roles
  root to: "application#index"
end
