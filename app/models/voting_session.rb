class VotingSession < ApplicationRecord
  belongs_to :project
  belongs_to :person

  validate :end_date_bigger_then_start_date, :end_date_in_future
  validates :end_date, presence: true
  validates :start_date, presence: true

  scope :find_by_project -> (project) {where("project_id=?", project.id)}
  scope :open -> {where("end_date>=?", Date.now)}
  scope :closed -> {where("end_date<?", Date.now)}

  private
  def end_date_bigger_then_start_date
    return if end_date.nil? or start_date.nil?
    if end_date < start_date
      errors.add(:end_date, "can't be before start date")
    end
  end
  def end_date_in_future
    return if end_date.nil?
    if end_date < Date.new
      errors.add(:end_date, "can't be in the past")
    end
  end
end
