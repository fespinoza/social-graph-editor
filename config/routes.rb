EmberSge::Application.routes.draw do
  ActiveAdmin.routes(self)

  devise_for :admin_users, ActiveAdmin::Devise.config

  resources :users, only: [:create, :show, :login, :update] do
    post :login, on: :collection
  end
  resources :social_networks do
    post :import, on: :collection
    post :join, on: :collection
  end
  resources :nodes
  resources :families
  resources :roles
  resources :node_attributes
  get '2013/v1/vocabulary', to: "social_networks#vocabulary", as: :vocabulary, defaults: { format: :rdf }
  root to: "application#index"
end
