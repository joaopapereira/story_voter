FactoryGirl.define do
  factory :voting_session do
    association :person, factory: :person
    association :project, factory: :project
    start_date "2016-09-23"
    end_date "2016-09-23"
  end
end
