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

  # Exclude password info from json output.
  def as_json(options={})
    options[:except] ||= [:created_at, :updated_at]
    super(options)
  end
end
