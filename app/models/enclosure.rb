class Enclosure < ApplicationRecord
  belongs_to :episode
  
  validates :episode, presence: true

  after_save :update_podcast_rss_feed! # this will fire after saving but if the post isn't published the episode will be skipped
  
  module MimeTypes
    M4A = "audio/x-m4a"
    MPEG = "audio/mpeg"
    QT = "video/quicktime"
    MP4 = "video/mp4"
    M4V = "video/x-m4v"
    PDF = "application/pdf"
  end
  
  def update_podcast_rss_feed!
    episode.podcast.create_rss_feed!(upload: Rails.env.production?)
  end
end
