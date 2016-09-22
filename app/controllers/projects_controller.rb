class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    return render :json => { :error => 'Need to login first' }, :status => 401 if current_user.nil?
    @projects = Github.new_projects current_user
  end

  def create
    return render :json => { :error => 'Need to login first' }, :status => 401 if current_user.nil?
    return render :json => { :error => 'repo_name was not present' }, :status => 400 unless params.include? :repo_name
    @projects = Github.new_projects current_user
    new_project = nil
    @projects.each do |project|
      if project.repo_name == params[:repo_name]
        project.save!
        Github.all_user_stories project
        new_project = project
        break
      end
    end
    return render :json => { :error => "Unable to find project with repository: #{params[:repo_name]}" }, :status => 404 if new_project.nil?
    render :json => {:success => "Added project with repository: '#{new_project.repo_name}'"}
  end

end
