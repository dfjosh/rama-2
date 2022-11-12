class CategoriesController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    @categories = Category.all.order(id: :desc)
  end
  
  def show
    @category = Category.find(params[:id])
  end
  
  def create
    @category = Category.create!(category_params)
    if @category
      redirect_to category_url(@category), notice: "Category was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    @category = Category.find(params[:id])
    if @category.update_attributes!(category_params)
      redirect_to category_url(@category), notice: "Catgory was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    @category = Category.find(params[:id])
    @category.destroy!
    redirect_to categories_url, notice: "Category was successfully deleted."
  end
  
  private
  
  def category_params
    params.require(:category).permit(:name, :created_at, :updated_at)
  end
end
