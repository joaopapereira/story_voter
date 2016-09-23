class Github
  include ActiveModel::Model
  def self.all_projects person
    projects = GithubService.new.get_all_projects person
  end

  def self.new_projects person
    result = []
    all_projects(person).each do |project|
      result << project if Project.find_by_repo_name(project.repo_name).nil?
    end
    result
  end
  def self.all_user_stories project
    user_stories = GithubService.new.get_all_open_issues project
    result = []
    user_stories.each do |user_story|
      user_s = UserStory.find_by_identifier(user_story.identifier)
      if user_s.nil?
        user_s = user_story
      else
        user_s.update_with_user_story user_story
      end
      user_s.save!
      result << user_s
    end
    result
  end
  def self.to_project(project)
    proj = Project.new
    proj.name = project[:name]
    proj.repo_name = project[:full_name]
    proj
  end
  def self.to_user_story(project, user_story)
    us = UserStory.new
    us.project = project
    us.identifier = user_story[:number]
    us.title = user_story[:title]
    us.url = user_story[:html_url]
    us
  end
end
