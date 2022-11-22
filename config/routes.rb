Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "posts#index"

  resources :categories
  resources :comments
  resources :enclosures
  resources :episodes
  resources :podcasts, param: :slug
  resources :posts, param: :slug
  resources :tags

end
