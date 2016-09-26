require'byebug'
class ProjectsController < ApplicationController
  def index
    result = []
    Project.all.each do |project|
      result << filtering_params(project)
    end
    return render :json => result, :status => 200
  end

  def new
    return render :json => { :error => 'Need to login first' }, :status => 401 if current_user.nil?
    @projects = Github.new_projects current_user
    result = {:user => [], :orgs => {}}
    @projects.each do |project|
      result[:user] << filtering_params(project) if project.repo_name.include? current_user.username
      (result[:orgs][project.repo_name.split(/\//).first] ||= []) << filtering_params(project) if not project.repo_name.include? current_user.username
    end
    return render :json => result, :status => 200
  end

  def create
  end


    # A list of the param names that can be used for filtering the Product list
    def filtering_params(params)
      params.slice(:id, :name, :repo_name, :num_of_user_stories)
    end
end
