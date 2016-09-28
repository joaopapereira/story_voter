class VotingSession < ApplicationRecord
  belongs_to :project
  belongs_to :person
  has_many :session_stories, :class_name => "SessionStory"
  has_many :user_stories, through: :session_stories

  validate :end_date_bigger_then_start_date, :end_date_in_future
  validates :end_date, presence: true
  validates :start_date, presence: true

  scope :find_by_project, -> (project) {where("project_id=?", project.id)}
  scope :open, -> {where("end_date>=?", Time.now).order(:end_date)}
  scope :closed, -> {where("end_date<?", Time.now).order(:end_date)}


  # Exclude password info from json output.
  def as_json(options={})
    options[:except] ||= [:created_at, :updated_at, :project_id, :person_id]
    options[:methods] ||= [:person, :project]
    super(options)
  end

  private
  def end_date_bigger_then_start_date
    return if end_date.nil? or start_date.nil?
    if end_date < start_date
      errors.add(:end_date, "can't be before start date")
    end
  end
  def end_date_in_future
    return if end_date.nil?
    if end_date < Time.now
      errors.add(:end_date, "can't be in the past")
    end
  end
end
