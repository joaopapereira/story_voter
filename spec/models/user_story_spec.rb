require 'rails_helper'

RSpec.describe UserStory, type: :model do
    describe 'Fixtures' do
      it 'should have a valid factory' do
        expect(FactoryGirl.create(:user_story)).to be_valid
      end
    end
    describe 'Database schema' do
      it {is_expected.to have_db_column :project_id}
      it {is_expected.to have_db_column :identifier }
    end
    describe 'Associations' do
      it { is_expected.to belong_to :project }
      it { is_expected.to have_many :votes }
    end
end
