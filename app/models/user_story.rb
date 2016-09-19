class UserStory < ApplicationRecord
  has_many :votes
  belongs_to :project

  def self.find_by_project project
    where(:project_id => project.id)
  end
  def update_with_user_story user_story
    title = user_story.title
    url = user_story.url
  end
end
