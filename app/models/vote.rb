class Vote < ApplicationRecord
  belongs_to :session_stories
  belongs_to :person
end
