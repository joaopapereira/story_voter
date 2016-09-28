class SessionStory < ApplicationRecord
  belongs_to :voting_session
  belongs_to :user_story
end
