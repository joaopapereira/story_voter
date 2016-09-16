class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @projects = Github.new_projects current_user
  end
end
