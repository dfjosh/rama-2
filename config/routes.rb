Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "posts#index"

  resources :categories
  resources :comments
  resources :enclosures
  resources :episodes
  get 'podcasts/:slug' => 'podcasts#show'
  resources :podcasts
  resources :posts, param: :slug
  resources :tags

end
