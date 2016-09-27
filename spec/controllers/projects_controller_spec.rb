require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  let(:user) { FactoryGirl.create(:person) }

  describe "GET #index" do
    before(:each) do
      @current_date = Time.now
      FactoryGirl.create(:project, {:id => 1, :name => "project1", :repo_name => "testing/test", :created_at => @current_date, :updated_at => @current_date})
      FactoryGirl.create(:project, {:id => 2, :name => "project2", :repo_name => "testing/test1", :created_at => @current_date, :updated_at => @current_date})
      proj = FactoryGirl.create(:project, {:id => 3, :name => "project2", :repo_name => "bobmanager/test1", :created_at => @current_date, :updated_at => @current_date})
      proj.user_stories << FactoryGirl.create(:user_story, :project => proj)
      get :index, format: :json

    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    context "JSON Check" do
      render_views

      it "success" do
        expected = [{:id => 1, :name => "project1", :repo_name => "testing/test", :num_of_user_stories => 0},
                    {:id => 2, :name => "project2", :repo_name => "testing/test1", :num_of_user_stories => 0},
                    {:id => 3, :name => "project2", :repo_name => 'bobmanager/test1', :num_of_user_stories => 1}]
        expect(response.body).to eq(expected.to_json)
      end
    end
  end

  describe "GET #new" do
    before(:each) do
      p1 = FactoryGirl.build(:project, {:id => nil, :name => "project3", :repo_name => "testing/test3"})
      p2 = FactoryGirl.build(:project, {:id => nil, :name => "project4", :repo_name => "testing/test4"})
      allow(Github).to receive(:new_projects).and_return([p1, p2])
    end
    context "user logged in" do
      before(:each) do
        allow(controller).to receive(:current_user) { user }

        get :new, format: :json
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      context "JSON Check" do
        render_views

        it "success" do
          expected = {:user => [],
                      :orgs => {:testing =>[{:id => nil, :name => "project3", :repo_name => "testing/test3", :num_of_user_stories => 0},
                                              {:id => nil, :name => "project4", :repo_name => "testing/test4", :num_of_user_stories => 0}] }}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "user not logged in" do
      before(:each) do
        get :new, format: :json
      end
      it "returns http success" do
        expect(response).to have_http_status(401)
      end

      context "JSON Check" do
        render_views

        it "success" do
          expected = {:error => "Need to login first"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
  end

  describe "POST #create" do
    let!(:p1) {double("Project", {:id => nil, :name => "project3", :repo_name => "testing/test3"})}
    let!(:p2) {double("Project",{:id => nil, :name => "project4", :repo_name => "testing/test4"})}
    let!(:us1) {double("UserStory",{:id => 1, :project => p1, :title => "issue 1"})}
    let!(:us2) {double("UserStory",{:id => 2, :project => p1, :title => "issue 2"})}
    before(:each) do
      allow(p1).to receive(:save!)
      allow(p2).to receive(:save!)
      allow(Github).to receive(:new_projects).and_return([p1, p2])
      allow(Github).to receive(:all_user_stories).and_return([us1, us2])
    end
    context "user not logged in" do
      before(:each) do
          post :create, params: {repo_name: "testing/test3"}, format: :json
      end
      it "returns http success" do
        expect(response).to have_http_status(401)
      end

      context "JSON Check" do
        render_views

        it "success" do
          expected = {:error => "Need to login first"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "user logged in" do
      before(:each) do
        allow(controller).to receive(:current_user) { user }
      end
      context "success" do
        before(:each) do
          post :create, params: {repo_name: "testing/test3"}, format: :json
        end
        it "returns http success" do
          expect(response).to have_http_status(:success)
        end
        context "JSON Check" do
          render_views
          it "success" do
            expected = {:success => "Added project with repository: 'testing/test3'"}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
      context "no repo_name" do
        before(:each) do
          post :create, format: :json
        end
        context "success" do
          it "returns http success" do
            expect(response).to have_http_status(400)
          end
          context "JSON Check" do
            render_views

            it "success" do
              expected = {:error => "repo_name was not present"}
              expect(response.body).to eq(expected.to_json)
            end
          end
        end
      end
      context "project not found" do
        before(:each) do
          post :create, params: {repo_name: "testing/test5"}, format: :json
        end
        it "returns http success" do
          expect(response).to have_http_status(404)
        end
        it "did not call save on project" do
          expect(p1).not_to receive(:save!)
          expect(p2).not_to receive(:save!)
        end
        context "JSON Check" do
          render_views
          it "success" do
            expected = {:error => "Unable to find project with repository: testing/test5"}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
    end
  end

end
