EmberSge::Application.routes.draw do
  resources :social_networks
  resources :actors
  root to: "application#index"
end
