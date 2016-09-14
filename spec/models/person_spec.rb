require 'rails_helper'

RSpec.describe Person, type: :model do
  describe 'Fixtures' do
    it 'should have a valid factory' do
      expect(FactoryGirl.create(:person)).to be_valid
    end
  end
  describe 'Database schema' do
    it {is_expected.to have_db_column :name}
    it {is_expected.to have_db_column :username }
  end
  describe 'Associations' do
    it { is_expected.to have_many :votes }
  end
end
