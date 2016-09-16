json.project do
  json.partial! 'projects/project', project: @project
end

if @user_stories.nil?
  json.user_stories []
else
  stories = @user_stories

  stories = [@user_stories] unless @user_stories.respond_to? :map

  json.user_stories stories do |user_story|
    json.partial! 'user_story', user_story: user_story
  end
end
