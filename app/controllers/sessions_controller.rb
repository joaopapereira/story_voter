class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    user = Person.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Person.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to root_url, :notice => "Signed in!"
  end

  def show

  end

  def destroy
    session[:user_id] = nil
    render :json => {:success => "Logout successfull"}, :status => 200
  end
end
