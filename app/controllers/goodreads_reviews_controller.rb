class GoodreadsReviewsController < ApplicationController
  def index
    goodreads_reviews = GoodreadsApi.get_reviews
    
    render json: goodreads_reviews
  end
end
