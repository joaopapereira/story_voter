class SessionHandlerController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    user = Person.find_by_provider_and_uid(auth["provider"], auth["uid"]) || Person.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to '/', :notice => "Signed in!"
  end

  def show
      if not current_user.nil?
        render :json => {"signed_in" => true, "user" => current_user}.to_json()
      else
        render :json => {"signed_in" => false}.to_json()
      end
  end

  def destroy
    session[:user_id] = nil
    render :json => {:success => "Logout successfull"}, :status => 200
  end
end
