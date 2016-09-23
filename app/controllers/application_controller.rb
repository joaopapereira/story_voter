class ApplicationController < ActionController::API

    private

    def current_user
      @current_user ||= Person.find(session[:user_id]) if session[:user_id]
    end
end
