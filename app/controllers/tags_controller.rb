class TagsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    tags = Tag.all.order(id: :desc)
    render json: tags
  end
  
  def show
    tag = Tag.find(params[:id])
    render json: tag
  end
  
  def create
    tag = Tag.create!(tag_params)
    if tag
      render json: tag
    else
      render json: {error: 400}
    end
  end
  
  def update
    tag = Tag.find(params[:id])
    if tag.update_attributes!(tag_params)
      render json: tag
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    tag = Tag.find(params[:id])
    tag.destroy!
  end
  
  private
  
  def tag_params
    params.require(:tag).permit(:name, :created_at, :updated_at)
  end
end
