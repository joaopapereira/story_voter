require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'Fixtures' do
    it 'should have a valid factory' do
      expect(FactoryGirl.create(:project)).to be_valid
    end
  end
  describe 'Database schema' do
    it {is_expected.to have_db_column :name}
    it {is_expected.to have_db_column :repo_name }
  end
  describe 'Associations' do
    it { is_expected.to have_many :user_story }
  end
end
