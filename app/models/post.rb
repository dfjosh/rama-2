class Post < ApplicationRecord
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_one :episode

  has_many :post_categories, dependent: :destroy
  has_many :categories, through: :post_categories
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  
  after_save :update_podcast_rss_feed!, if: :has_episode?
  
  module States
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"
  end

  # override so that methods like post_path can still accept @post and it will know to pass slug in place of id
  def to_param
    slug
  end
  
  def self.gutter_columns
    2
  end

  def self.content_columns
    12 - self.gutter_columns * 2
  end

  def is_draft?
    self.state == States::DRAFT ? true : false
  end

  def is_published?
    self.state == States::PUBLISHED ? true : false
  end

  def is_archived?
    self.state == States::ARCHIVED ? true : false
  end

  # def self.where_post_id(id = [])
  #   self.where(id: id)
  # end
  
  # def self.where_state(states = [])
  #   self.where(state: states)
  # end
  
  # def self.where_tags(tags = [])
  #   self.joins(:tags)
  #       .where(tags: {name: tags})
  # end

  # def self.where_categories(categories = [])
  #   self.joins(:categories)
  #       .where(categories: {name: categories})
  # end

  # def self.where_not_categories(categories = [])
  #   self.joins(:categories)
  #       .where.not(categories: {name: categories})
  # end
  
  def has_episode?
    episode.present?
  end
  
  def update_podcast_rss_feed!
    episode.podcast.create_rss_feed!(upload: Rails.env.production?)
  end

  def html_body
    if !self.body
      return ""
    else
      body_with_placeholders_replaced = self.body.gsub(/&cdnURL&/, Rails.configuration.cdn_url.to_s)
      return body_with_placeholders_replaced.html_safe
    end
  end

end
