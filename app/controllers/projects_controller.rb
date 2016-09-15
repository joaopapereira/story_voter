class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @projects = Project.new_projects current_user
  end
end
