class EpisodesController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    @episodes = Episode.all.order(created_at: :desc)
  end
  
  def show
    @episode = Episode.find(params[:id])
  end

  def new
    @episode = Episode.new
  end

  def edit
    @episode = Episode.find(params[:id])
  end
  
  def create
    number = Episode.all.map(&:number).max + 1
    guid = SecureRandom.uuid
    if @episode = Episode.create!(episode_params.merge({number: number, guid: guid}))
      redirect_to episode_url(@episode), notice: "Episode was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    @episode = Episode.find(params[:id])
    if @episode.update!(episode_params)
      redirect_to episode_url(@episode), notice: "Episode was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    episode = Episode.find(params[:id])
    episode.destroy!
    redirect_to episode_url, notice: "Episode was successfully deleted."
  end
  
  private
  
  def episode_params
    permitted = [:title, :guid, :summary, :number, :episode_type, :duration, :explicit, :image, :podcast_id, :post_id, 
      :user_id, :created_at, :updated_at]
    params.require(:episode).permit(*permitted)
  end
end
