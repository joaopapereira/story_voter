require 'rails_helper'

RSpec.describe SessionHandlerController, type: :controller do

  let(:user) { FactoryGirl.create(:person) }
  describe "GET #create" do
    pending "add some examples to (or delete) #{__FILE__}"
  end

  describe "GET #show" do
    context "logged in user" do
      before (:each) do
        allow(controller).to receive(:current_user) { user }
        get :show
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "check JSON" do
        expect(response.body).to eq({signed_in: true, user: {id: 1, name: "Bob Manager", username: "bobmanager"}}.to_json)
      end
    end
    context "not logged in user" do
      before (:each) do
        allow(controller).to receive(:current_user) { nil }
        get :show
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "check JSON" do
        expect(response.body).to eq({signed_in: false}.to_json)
      end
    end
  end

  describe "GET #destroy" do
    it "returns http success" do
      get :destroy
      expect(response).to have_http_status(:success)
    end
  end

end
