require 'rails_helper'
RSpec.describe UserStoriesController, type: :controller  do

  describe "GET #index" do
    context "invalid project" do
      before(:each) do
        p = FactoryGirl.build(:project, :id => 1)
        get :index, {:project_id => p}, format: :json
      end

      it "returns http error" do
        expect(response).to have_http_status(402)
      end
    end
  end
end
