require 'rails_helper'

RSpec.describe VotingSessionController, type: :controller do

  let(:user) { FactoryGirl.create(:person) }
  let(:project) {  FactoryGirl.build(:project, :id => 10) }

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
          post :create, params: {:project_id => project, :voting_session => {:end_date => Date.new + 1}}, format: :json
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
          post :create, params: {:project_id => project, :voting_session => {:start_date => Date.new + 1}}, format: :json
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
          post :create, params: {:project_id => project, :voting_session => {:start_date => Date.new + 1, :end_date => Date.new + 2}}, format: :json
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
    it "returns http success" do
      p = FactoryGirl.build(:project, :id => 10)
      get :index, params: {:project_id => p}, format: :json
      expect(response).to have_http_status(:success)
    end
  end


end
