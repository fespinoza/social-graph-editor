EmberSge::Application.routes.draw do
  resources :social_networks
  resources :nodes
  resources :families
  root to: "application#index"
end
