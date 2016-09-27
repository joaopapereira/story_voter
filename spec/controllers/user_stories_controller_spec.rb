require 'rails_helper'

RSpec.describe UserStoriesController, type: :controller do
describe "GET #index" do
    context "invalid project" do
      before(:each) do
        p = FactoryGirl.build(:project, :id => 10)
        get :index, params: {:project_id => p}, format: :json
      end

      it "returns http error" do
        expect(response).to have_http_status(402)
      end
    end
    context "valid project" do
      let(:project1) {FactoryGirl.create(:project, {:id => 1, :name => "project1", :repo_name => "testing/test"})}
      let(:project2) {FactoryGirl.create(:project, {:id => 2, :name => "project2", :repo_name => "testing1/test"})}
      let!(:project3) {FactoryGirl.create(:project, {:id => 3, :name => "project3", :repo_name => "testing3/test"})}
      let!(:user_story1) {FactoryGirl.create(:user_story, {:id => 1, :project => project1, :identifier => "123"})}
      let!(:user_story2) {FactoryGirl.create(:user_story, {:id => 2, :project => project1, :identifier => "1"})}
      let!(:user_story3) {FactoryGirl.create(:user_story, {:id => 3, :project => project2, :identifier => "12", :title => "My title", :url => "http://places/1"})}
      render_views
      context "with stories" do
        before(:each) do
          get :index, params: {:project_id => project2}, format: :json
        end
        it "returns http error" do
          expect(response).to have_http_status(200)
        end
        it "json response" do
          expected = {:project => {:id => 2, :name => "project2", :repo_name => "testing1/test", :num_of_user_stories => 1},
                       :stories => [{:id => 3, :identifier => "12", :title => "My title", :url => "http://places/1"}]}
          expect(response.body).to eq(expected.to_json)
        end
      end
      context "without stories" do
        before(:each) do
          get :index, params: {:project_id => project3}, format: :json
        end
        it "returns http error" do
          expect(response).to have_http_status(200)
        end
        it "json response" do
          expected = {:project => {:id => 3, :name => "project3", :repo_name => "testing3/test", :num_of_user_stories => 0},
                       :stories => []}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
  end

end
