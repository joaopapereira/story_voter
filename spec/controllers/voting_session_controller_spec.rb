require 'rails_helper'

RSpec.describe VotingSessionController, type: :controller do

  let(:user) { FactoryGirl.create(:person) }
  let(:project) {  FactoryGirl.build(:project, :id => 10) }
  let(:project1) {  FactoryGirl.create(:project, :id => 15) }

  describe "POST #create" do
    context "User not logged in" do
      before(:each) do
        post :create, params: {:project_id => project}, format: :json
      end
      it "returns http error" do
        expect(response).to have_http_status(401)
      end

      context "JSON Check" do
        it "success" do
          expected = {:error => "Need to login first"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "User logged in" do
      before(:each) do
          allow(controller).to receive(:current_user) { user }
      end
      context "invalid project" do
        before(:each) do
          post :create, params: {:project_id => project}, format: :json
        end
        it "returns http error" do
          expect(response).to have_http_status(402)
        end

        context "JSON Check" do
          it "success" do
            expected = {:error => "Project with ID 10 cannot be found"}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
      context "no start_date" do
        before(:each) do
          project.save!
          post :create, params: {:project_id => project, :voting_session => {:end_date => Time.now + 1.day}}, format: :json
        end
        it "returns http error" do
          expect(response).to have_http_status(400)
        end

        context "JSON Check" do
          it "success" do
            expected = {:error => {:start_date => ["can't be blank"]}}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
      context "no end_date" do
        before(:each) do
          project.save!
          post :create, params: {:project_id => project, :voting_session => {:start_date => Time.now + 1.day}}, format: :json
        end
        it "returns http error" do
          expect(response).to have_http_status(400)
        end

        context "JSON Check" do
          it "success" do
            expected = {:error => {:end_date => ["can't be blank"]}}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
      context "success" do
        before(:each) do
          project.save!
          post :create, params: {:project_id => project, :voting_session => {:start_date => Time.now + 1.day, :end_date => Time.now + 2.day}}, format: :json
        end
        it "returns http success" do
          expect(response).to have_http_status(200)
        end

        context "JSON Check" do
          it "success" do
            expected = {:success => "Session created"}
            expect(response.body).to eq(expected.to_json)
          end
        end
      end
    end
  end

  describe "GET #index" do
    context "invalid project" do
      before(:each) do
        get :index, params: {:project_id => project}, format: :json
      end
      it "returns http error" do
        expect(response).to have_http_status(402)
      end

      context "JSON Check" do
        it "success" do
          expected = {:error => "Project with ID 10 cannot be found"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "no sessions" do
      before(:each) do
        project.save!
        get :index, params: {:project_id => project}, format: :json
      end
      it "returns http error" do
        expect(response).to have_http_status(200)
      end

      context "JSON Check" do
        it "success" do
          expected = {:sessions => []}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "sessions" do
      let(:creator) {FactoryGirl.create(:person, :username => "creator")}
      before(:each) do
        project.save!
        @today = Time.now
        FactoryGirl.create(:voting_session, :id=> 1, :person => creator, :project => project, :end_date => @today.midnight + 1.day, :start_date => @today)
        FactoryGirl.create(:voting_session, :id=> 2, :person => creator, :project => project, :end_date => @today.midnight + 2.day, :start_date => @today)
        session = FactoryGirl.create(:voting_session, :id=> 3, :person => creator, :project => project, :end_date => @today.midnight + 3.day, :start_date => @today)
        FactoryGirl.create(:voting_session, :id=> 4, :person => creator, :project => project1, :end_date => @today.midnight + 3.day, :start_date => @today)
        @user_story = FactoryGirl.create(:user_story, :id => 1, :project => project)
        session.user_stories << @user_story
        Timecop.freeze(@today + 1.day)
        get :index, params: {:project_id => project}, format: :json
      end
      after(:each) do
        Timecop.return
      end
      it "returns http error" do
        expect(response).to have_http_status(200)
      end

      context "JSON Check" do
        it "success" do
          today = Date.parse(@today.strftime('%Y/%m/%d'))
          expected = {:sessions => [{:id => 2, :start_date => today, :end_date => today+2, :person => creator.as_json, :project => project.as_json, :user_stories => []},
                                    {:id => 3, :start_date => today, :end_date => today+3, :person => creator.as_json, :project => project.as_json, :user_stories => [@user_story]}]}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
  end
  describe "GET #show" do
    let(:voting_session) {FactoryGirl.create(:voting_session, :id=> 1, :project => project, :person => user)}
    let(:project2) {  FactoryGirl.build(:project, :id => 11) }
    context "invalid project" do
      before(:each) do
        get :show, params: {:project_id => project2, :id => voting_session}, format: :json
      end
      it "returns http error" do
        expect(response).to have_http_status(402)
      end

      context "JSON Check" do
        it "success" do
          expected = {:error => "Project with ID 11 cannot be found"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "invalid session" do
      before(:each) do
        project.save!
        get :show, params: {:project_id => project, :id => VotingSession.new(:id => 100)}, format: :json
      end
      it "returns http error" do
        expect(response).to have_http_status(402)
      end

      context "JSON Check" do
        it "success" do
          expected = {:error => "Voting session with ID 100 cannot be found"}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
    context "session" do
      let(:creator) {FactoryGirl.create(:person, :username => "creator")}
      before(:each) do
        project.save!
        @today = Time.now
        FactoryGirl.create(:voting_session, :id=> 1, :person => creator, :project => project, :end_date => @today.midnight + 1.day, :start_date => @today)
        FactoryGirl.create(:voting_session, :id=> 2, :person => creator, :project => project, :end_date => @today.midnight + 2.day, :start_date => @today)
        session = FactoryGirl.create(:voting_session, :id=> 3, :person => creator, :project => project, :end_date => @today.midnight + 3.day, :start_date => @today)
        @user_story = FactoryGirl.create(:user_story, :id => 1, :project => project)
        session.user_stories << @user_story
        get :show, params: {:project_id => project, :id => session}, format: :json
      end
      after(:each) do
        Timecop.return
      end
      it "returns http error" do
        expect(response).to have_http_status(200)
      end

      context "JSON Check" do
        it "success" do
          today = Date.parse(@today.strftime('%Y/%m/%d'))
          expected = {:session => {:id => 3, :start_date => today, :end_date => today+3, :person => creator.as_json, :project => project.as_json, :user_stories => [@user_story]}}
          expect(response.body).to eq(expected.to_json)
        end
      end
    end
  end
end
