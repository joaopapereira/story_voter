class AuthController < ApplicationController
  def signedin
    if not current_user.nil?
      render :json => {"signed_in" => true, "user" => current_user}.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end
  end
end
