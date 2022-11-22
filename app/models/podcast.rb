class Podcast < ApplicationRecord
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_many :episodes
  
  module PodcastTypes
    EPISODIC = "episodic"
    SERIAL = "serial"
  end

  def to_param
    slug
  end
  
  def self.where_state(states = [])
    self.where(state: states)
  end

  def explicit_str
    explicit == true ? "yes" : "no"
  end
  
  def create_rss_feed!(upload: false)
    rss = Tempfile.new
    rss << <<-HEREDOC
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>#{CGI::escapeHTML(title)}</title>
    <link>#{website}</link>
    <language>en-us</language>
    <copyright>&#169; #{Time.now.year} #{author.pen_name}</copyright>
    <itunes:author>#{author.pen_name}</itunes:author>
    <description>#{CGI::escapeHTML(description)}</description>
    <itunes:type>#{podcast_type}</itunes:type>
    <itunes:owner>
      <itunes:name>#{author.pen_name}</itunes:name>
      <itunes:email>#{author.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="#{File.join(Rails.configuration.cdn_url, image)}"/>
    <itunes:category text="#{CGI::escapeHTML(category)}">
      <itunes:category text="#{CGI::escapeHTML(subcategory)}"/>
    </itunes:category>
    <itunes:explicit>#{explicit}</itunes:explicit>
      HEREDOC
      
    episodes.joins(:post).where(posts: {state: Post::States::PUBLISHED}).order("posts.published_at DESC").each do |episode|
      rss << <<-HEREDOC
    <item>
      <itunes:episodeType>#{episode.episode_type}</itunes:episodeType>
      <itunes:episode>#{episode.number}</itunes:episode>
      <title>#{CGI::escapeHTML(episode.title)}</title>
      <itunes:title>#{CGI::escapeHTML(episode.title)}</itunes:title>
      <description>#{CGI::escapeHTML(episode.summary)}</description>
      <itunes:summary><![CDATA[#{CGI::escapeHTML(episode.summary)}]]></itunes:summary>
      <enclosure 
        length="#{episode.enclosure.size}" 
        type="#{episode.enclosure.mime_type}" 
        url="#{File.join(Rails.configuration.cdn_url, episode.enclosure.url)}"
      />
      <link>#{File.join(Rails.configuration.web_url, "posts", episode.post.slug)}</link>
      <guid>#{episode.guid}</guid>
      <pubDate>#{episode.post.published_at.rfc2822}</pubDate>
      <itunes:duration>#{episode.duration}</itunes:duration>
      <itunes:explicit>#{episode.explicit}</itunes:explicit>
    </item>
        HEREDOC
    end
      
    rss << <<-HEREDOC
  </channel>
</rss>
      HEREDOC
    
    if upload
      rss.close
      target = File.join(title.parameterize, "#{title.parameterize}.xml")
      S3Api.upload_file!(rss.path, target)
      rss.open
    end
    
    rss.rewind
    puts rss.read
    rss.close
    
    rss.unlink
  end
end
