class EnclosuresController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    enclosures = Enclosure.all.order(id: :desc)
    render json: enclosures
  end
  
  def show
    enclosure = Enclosure.find(params[:id])
    render json: enclosure
  end
  
  def create
    enclosure = Enclosure.create!(enclosure_params)
    if enclosure
      render json: enclosure
    else
      render json: {error: 400}
    end
  end
  
  def update
    enclosure = Enclosure.find(params[:id])
    if enclosure.update_attributes!(enclosure_params)
      render json: enclosure
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    enclosure = Enclosure.find(params[:id])
    enclosure.destroy!
  end
  
  private
  
  def enclosure_params
    params.require(:enclosure).permit(:url, :size, :mime_type, :episode_id, :created_at, :updated_at)
  end
end
