EmberSge::Application.routes.draw do
  resources :social_networks
  resources :nodes
  root to: "application#index"
end
