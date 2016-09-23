class SessionStory < ApplicationRecord
  belongs_to :voting_sessions
  belongs_to :user_stories
end
