class UserStoriesController < ApplicationController
  def index
    return render :json => { :error => 'Project ID not found' }, :status => 400 unless params.include? :project_id
    @project = Project.find_by_id(params[:project_id])
    return render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 402 if @project.nil?
    @user_stories = UserStory.find_by_project(@project)
    return render :json => { :project => @project, :stories => @user_stories}
    
  end
  # A list of the param names that can be used for filtering the Product list
  def filtering_params(params)
    params.slice(:id, :identifier, :title, :url)
  end
end
