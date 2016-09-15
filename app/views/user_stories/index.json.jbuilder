json.partial! 'projects/index', projects: @project

json.user_stories @user_stories do |user_story|
  json.id user_story.id
  json.identifier user_story.identifier
end
