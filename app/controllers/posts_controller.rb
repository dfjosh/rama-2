class PostsController < ApplicationController
  # before_action :authenticate_user, only: [:create, :update, :destroy]
  
  def index
    @posts = Post.all.order(created_at: :desc)#.limit(10) # TODO
  end
  
  def show
    @post = Post.find_by_slug params[:slug]
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find_by_slug params[:slug]
  end
  
  def create
    @post = Post.new post_params.merge({user_id: 1}) # HACK
    @post.published_at = DateTime.now.utc # TODO allow this to be set in the UI
    if @post.save!
      redirect_to post_url(@post), notice: "Post was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    @post = Post.find_by_slug params[:slug]
    if @post.update! post_params
      redirect_to post_url(@post), notice: "Post was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    post = Post.find_by_slug params[:slug]
    post.destroy!
    redirect_to posts_url, notice: "Post was successfully deleted."
  end
  
  private
  
  def post_params
    permitted = [:title, :slug, :body, :created_at, :updated_at, :feature_image, :feature_link, :state, :user_id, :published_at]
    params.require(:post).permit(*permitted)
  end
end
