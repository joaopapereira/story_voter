FactoryGirl.define do
  factory :person do
    name "Bob Manager"
    username "bobmanager"
    provider "github"
    uid "1234"
  end
end
