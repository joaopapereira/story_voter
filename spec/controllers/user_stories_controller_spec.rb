require 'rails_helper'
RSpec.describe UserStoriesController, type: :controller  do

  describe "GET #index" do
    context "invalid project" do
      before(:each) do
        get project_user_stories_path(1), format: :json
      end

      it "returns http error" do
        expect(response).to have_http_status(401)
      end
    end
  end
end
