class PodcastsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]
  
  def index
    podcasts = Podcast.all
    scopes = []
    
    if !current_user&.is_admin?
      scopes << { scope: :where_state, args: [Post::States::PUBLISHED] }
    end
    
    if filters = params[:filters]
      filters.each do |filter|
        filter = filter.second
        scopes << {
          scope: "where_#{filter[:scope]}".to_sym, 
          args: filter[:args]
        }
      end
    end
    
    podcasts = scopes.inject(Podcast.all) do |model, scope|
      puts "scoping #{model.name} --> #{scope.inspect}"
      model.send(scope[:scope], *scope[:args])
    end
    
    podcasts = podcasts.order(created_at: :desc)

    render json: podcasts
  end
  
  def show
    podcast = Podcast.find_by_slug(params[:slug])
    render json: podcast
  end
  
  def create
    if podcast = Podcast.create!(podcast_params)
      render json: podcast
    else
      render json: {error: 400}
    end
  end
  
  def update
    podcast = Podcast.find(params[:id])
    if podcast.update_attributes!(podcast_params)
      render json: podcast
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    podcast = Podcast.find(params[:id])
    podcast.destroy!
  end
  
  private
  
  def podcast_params
    permitted = [:title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
      :created_at, :updated_at, :slug, :state, :header_image, :external_id]
    params.require(:podcast).permit(*permitted)
  end
end
