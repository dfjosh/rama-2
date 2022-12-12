class Episode < ApplicationRecord
  belongs_to :podcast
  belongs_to :post
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_one :enclosure
  
  # validates :enclosure, presence: true
  
  after_save :update_podcast_rss_feed!, if: :has_enclosure? # this should never fire since the relationship exists on the enclosure and I create the enclosure after the episode.
  
  module EpisodeTypes
    FULL = "full"
    TRAILER = "trailer"
    BONUS = "bonus"
  end
  
  def self.where_podcast_id(podcast_id = [])
    self.where(podcast_id: podcast_id)
  end
  
  def self.where_post_id(post_id = [])
    self.where(post_id: post_id)
  end
  
  def update_podcast_rss_feed!
    podcast.create_rss_feed!(upload: Rails.env.production?)
  end
  
  # def production_ready?
  #   enclosure.present? && post.state == Post::States::PUBLISHED
  # end
  
  def has_enclosure?
    enclosure.present?
  end
end
