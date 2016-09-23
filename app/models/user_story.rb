class UserStory < ApplicationRecord
  belongs_to :project
  has_many :votes, :through => :session_stories
end
