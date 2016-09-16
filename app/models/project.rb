class Project < ApplicationRecord
  has_many :user_story

  def num_of_user_stories
    user_story.length
  end
end
