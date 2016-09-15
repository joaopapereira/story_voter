require 'byebug'
class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    byebug
    user = Person.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Person.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to root_url, :notice => "Signed in!"

    #token = jwtEncode('user_id' => user.id)
    #respond_to do |format|
    #  format.json { render json: {'token' => token}, status: :created }
    #end
  end

  def show

  end

  def destroy
    session[:user_id] = nil
    render :json => {:success => "Logout successfull"}, :status => 200
  end
end
