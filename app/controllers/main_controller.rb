class MainController < ApplicationController
  def index
    @projects = Project.all
  end
end
