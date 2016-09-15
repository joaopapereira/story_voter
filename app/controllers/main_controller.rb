class MainController < ApplicationController
  def index
    @location_path = "/#{params[:path]}"
  end
end
