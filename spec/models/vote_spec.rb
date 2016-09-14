require 'rails_helper'

RSpec.describe Vote, type: :model do
    describe 'Fixtures' do
      it 'should have a valid factory' do
        expect(FactoryGirl.create(:user_story)).to be_valid
      end
    end
    describe 'Database schema' do
      it {is_expected.to have_db_column :person_id}
      it {is_expected.to have_db_column :user_story_id }
      it {is_expected.to have_db_column :vote }
    end
    describe 'Associations' do
      it { is_expected.to belong_to :person }
      it { is_expected.to belong_to :user_story }
    end
end
