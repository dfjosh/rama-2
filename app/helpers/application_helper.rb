module ApplicationHelper
  def path_join(*paths)
    path_array = []
    path_array << paths[0].gsub(/\/$/, "")
    path_array += paths[1...-1].map{ |p| p.gsub(/\/$/, "") }
    path_array << paths[-1].gsub(/^\//, "")
    path_array.join("/")
  end

  def pretty_duration(dur_in_secs)
    seconds = dur_in_secs % 60
    minutes = dur_in_secs / 60 % 60
    hours = dur_in_secs / 60 / 60 % 60

    [
      hours > 0 ? hours.to_s + "h" : nil,
      minutes > 0 ? minutes.to_s + "m" : nil,
      seconds > 0 ? seconds.to_s + "s" : nil
    ].compact.join(" ")
  end
end
