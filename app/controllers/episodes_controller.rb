class EpisodesController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    episodes = Episode.all
    scopes = []
    
    if filters = params[:filters]
      puts "filters => #{filters.inspect}"
      filters.each do |filter|
        puts 
        filter = filter.second # because array params are hasherzied: {"filters"=>{"0"=>{"scope"=>"post_id", "args"=>["111"]}}}
        puts "filter => #{filter.inspect}"
        scopes << {
          scope: "where_#{filter[:scope]}".to_sym, 
          args: filter[:args]
        }
      end
    end
    
    episodes = scopes.inject(Episode.all) do |model, scope|
      puts "scoping #{model.name} --> #{scope.inspect}"
      model.send(scope[:scope], *scope[:args])
    end
    
    episodes = episodes.joins(:post).includes(params[:includes]).order("posts.published_at DESC")
    
    render json: episodes
  end
  
  def show
    episode = Episode.find(params[:id])
    render json: episode
  end
  
  def create
    episode = Episode.new(episode_params)
    episode.guid = SecureRandom.uuid
    if episode.save!
      render json: episode
    else
      render json: {error: 400}
    end
  end
  
  def update
    episode = Episode.find(params[:id])
    if episode.update_attributes!(episode_params)
      render json: episode
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    episode = Episode.find(params[:id])
    episode.destroy!
  end
  
  private
  
  def episode_params
    permitted = [:title, :guid, :summary, :number, :episode_type, :duration, :explicit, :image, :podcast_id, :post_id, 
      :user_id, :created_at, :updated_at]
    params.require(:episode).permit(*permitted)
  end
end
