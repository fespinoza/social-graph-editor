EmberSge::Application.routes.draw do
  resources :social_networks
  resources :nodes
  resources :families
  resources :roles
  resources :node_attributes
  root to: "application#index"
end
