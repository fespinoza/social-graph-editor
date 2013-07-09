EmberSge::Application.routes.draw do
  resources :users, only: [:create, :show, :login] do
    post :login, on: :collection
  end
  resources :social_networks do
    post :import, on: :collection
  end
  resources :nodes
  resources :families
  resources :roles
  resources :node_attributes
  get '2013/v1/vocabulary', to: "social_networks#vocabulary", as: :vocabulary, defaults: { format: :rdf }
  root to: "application#index"
end
