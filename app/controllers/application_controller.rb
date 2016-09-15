class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user
  include JsonWebToken

  private

  def current_user
    @current_user ||= Person.find(session[:user_id]) if session[:user_id]
  end
end
