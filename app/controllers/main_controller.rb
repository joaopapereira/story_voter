class MainController < ApplicationController
  def index
    @projects = Project.all
    @location_path = "/#{params[:path]}"
  end
end
