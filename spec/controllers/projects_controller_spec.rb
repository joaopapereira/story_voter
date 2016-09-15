require 'rails_helper'
RSpec.describe ProjectsController, type: :controller  do

  describe "GET #index" do
    before(:each) do
      @current_date = Time.now
      FactoryGirl.create(:project, {:id => 1, :name => "project1", :repo_name => "testing/test", :created_at => @current_date, :updated_at => @current_date})
      FactoryGirl.create(:project, {:id => 2, :name => "project2", :repo_name => "testing/test1", :created_at => @current_date, :updated_at => @current_date})
      get :index, format: :json

    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    context "JSON Check" do
      render_views

      it "success" do
        expected = {:projects => [{:id => 1, :name => "project1", :repo_name => "testing/test"},
                                {:id => 2, :name => "project2", :repo_name => "testing/test1"}] }
        expect(response.body).to eq(expected.to_json)
      end
    end
  end
end
