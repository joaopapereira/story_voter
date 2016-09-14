class UserStory < ApplicationRecord
  has_many :votes
  belongs_to :project
end
