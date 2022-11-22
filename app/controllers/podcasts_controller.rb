class PodcastsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]
  
  def index
    @podcasts = Podcast.all.order(created_at: :desc)
  end
  
  def show
    @podcast = Podcast.find_by_slug(params[:slug])
  end

  def new
    @podcast = Podcast.new
  end

  def edit
    @podcast = Podcast.find_by_slug(params[:slug])
  end
  
  def create
    if @podcast = Podcast.create!(podcast_params)
      redirect_to podcast_url(@podcast), notice: "Podcast was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    @podcast = Podcast.find_by_slug(params[:slug])
    if @podcast.update!(podcast_params)
      redirect_to podcast_url(@podcast), notice: "Podcast was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    podcast = Podcast.find_by_slug(params[:slug])
    podcast.destroy!
    redirect_to podcast_url, notice: "Podcast was successfully deleted."
  end
  
  private
  
  def podcast_params
    permitted = [:title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
      :created_at, :updated_at, :slug, :state, :header_image, :external_id]
    params.require(:podcast).permit(*permitted)
  end
end
