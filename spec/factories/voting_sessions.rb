FactoryGirl.define do
  factory :voting_session do
    association :person, factory: :person
    association :project, factory: :project
    start_date Time.now - 1.day
    end_date Time.now + 1.day
  end
end
