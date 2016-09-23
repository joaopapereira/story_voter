class Person < ApplicationRecord
  has_many :votes
  has_many :voting_sessions


  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.username = auth["info"]["nickname"]
    end
  end
end
