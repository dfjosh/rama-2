class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email
  
  has_many :posts
  has_many :episodes
  has_many :podcasts
  
  def is_admin?
    is_admin
  end
end
