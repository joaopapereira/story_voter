class UserStory < ApplicationRecord
  belongs_to :project
  has_many :votes, :through => :session_stories
  
  
  def self.find_by_project project
    where(:project_id => project.id)
  end
  
  # Exclude password info from json output.
  def to_json(options={})
    options[:except] ||= [:created_at, :updated_at, :project_id]
    super(options)
  end
  
  # Exclude password info from json output.
  def as_json(options={})
    options[:except] ||= [:created_at, :updated_at, :project_id]
    super(options)
  end
end
