class Project < ApplicationRecord
  has_many :user_stories
  has_many :voting_sessions


  def num_of_user_stories
    user_stories.length
  end

   # Exclude password info from json output.
   def to_json(options={})
     options[:except] ||= [:created_at, :updated_at]
     super(options)
   end
   # Exclude password info from json output.
   def as_json(options={})
     options[:except] ||= [:created_at, :updated_at]
     options[:methods] ||= [:num_of_user_stories]
     super(options)
   end
end
