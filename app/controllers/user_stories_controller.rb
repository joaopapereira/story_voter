class UserStoriesController < ApplicationController
  def index
    render :json => { :error => 'Project ID not found' }, :status => 401 unless params.include? :project_id
    @project = Project.find_by_id(params[:project_id])
    render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 402 unless params.include? :project_id
    @user_stories = UserStory.find_by_project(@project)
  end
end
