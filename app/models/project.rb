class Project < ApplicationRecord
  has_many :user_stories
  has_many :voting_sessions


  def num_of_user_stories
    user_stories.length
  end
end
