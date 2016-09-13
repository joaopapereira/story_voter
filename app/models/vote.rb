class Vote < ApplicationRecord
  belongs_to :person
  belongs_to :user_story
end
