EmberSge::Application.routes.draw do
  resources :users, only: [:create, :show, :login] do
    post :login, on: :collection
  end
  resources :social_networks do
    get :vocabulary, on: :member
  end
  resources :nodes
  resources :families
  resources :roles
  resources :node_attributes
  root to: "application#index"
end
