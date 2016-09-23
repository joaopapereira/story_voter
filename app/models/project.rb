class Project < ApplicationRecord
  has_many :user_stories
  has_many :voting_sessions
end
