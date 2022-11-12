class CommentsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    comments = Comment.all
    render json: comments
  end
  
  def show
    comment = Comment.find(params[:id])
    render json: comment
  end
  
  def create
    comment = Comment.create!(comment_params)
    if comment
      render json: comment
    else
      render json: {error: 400}
    end
  end
  
  def update
    comment = Comment.find(params[:id])
    if comment.update_attributes!(comment_params)
      render json: comment
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!
  end
  
  private
  
  def comment_params
    params.require(:comment).permit(:post_id, :author, :email, :content, :approved, :parent, :created_at, :updated_at)
  end
end
