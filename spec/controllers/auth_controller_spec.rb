require 'rails_helper'

RSpec.describe AuthController, type: :controller do

  describe "GET #signedin" do
    it "returns http success" do
      get :signedin
      expect(response).to have_http_status(:success)
    end
  end

end
