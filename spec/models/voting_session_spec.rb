require 'rails_helper'

RSpec.describe VotingSession, type: :model do
  describe 'Fixtures' do
    it 'should have a valid factory' do
      expect(FactoryGirl.create(:voting_session)).to be_valid
    end
  end
  describe 'Database schema' do
    it {is_expected.to have_db_column :start_date}
    it {is_expected.to have_db_column :end_date }
    it {is_expected.to have_db_column :project_id }
    it {is_expected.to have_db_column :person_id }
  end
  describe 'Associations' do
    it { is_expected.to belong_to :project }
    it { is_expected.to belong_to :person }
  end
  describe 'Validations' do
    it { is_expected.to validate_presence_of :start_date }
    it { is_expected.to validate_presence_of :end_date }
    context 'end_date' do
      subject { FactoryGirl.build(:voting_session) }
      it "in the past" do
        subject.end_date = Date.new - 1
        expect(subject).to_not be_valid
      end
      it "in the future" do
        subject.end_date = Date.new + 1
        expect(subject).to_not be_valid
      end
      it "today" do
        subject.start_date = Date.new - 3
        subject.end_date = Date.new
        expect(subject).to be_valid
      end
    end
    context 'dates' do
      subject { FactoryGirl.build(:voting_session) }
      it "start date equal to end date" do
        subject.end_date = Date.new + 1
        subject.start_date = subject.end_date
        expect(subject).to be_valid
      end
      it "start date after end date" do
        subject.end_date = Date.new + 1
        subject.start_date = subject.end_date + 1
        expect(subject).to_not be_valid
      end
      it "start date before end date" do
        subject.end_date = Date.new + 1
        subject.start_date = subject.end_date - 1
        expect(subject).to be_valid
      end
    end
  end
end
