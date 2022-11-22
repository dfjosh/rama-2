class TagsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    @tags = Tag.all.order(id: :desc)
  end
  
  def show
    @tag = Tag.find(params[:id])
  end

  def new
    @tag = Tag.new
  end

  def edit
    @tag = Tag.find(params[:id])
  end
  
  def create
    @tag = Tag.create!(tag_params)
    if @tag
      redirect_to tag_url(@tag), notice: "Tag was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      redirect_to tag_url(@tag), notice: "Tag was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy!
    redirect_to tags_url, notice: "Tag was successfully deleted."
  end  
  private
  
  def tag_params
    params.require(:tag).permit(:name, :created_at, :updated_at)
  end
end
