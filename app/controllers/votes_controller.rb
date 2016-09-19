class VotesController < ApplicationController
  def create
    return render :json => { :error => 'Need to login first' }, :status => 401 if current_user.nil?
    return render :json => { :error => 'vote was not present' }, :status => 400 unless params.include? :vote
    @project = Project.find_by_id(params[:project_id])
    return render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 404 if @project.nil?
    @user_story = UserStory.find_by_id(params[:user_story_id])
    return render :json => { :error => "User Story with ID #{params[:user_story_id]} cannot be found"}, :status => 404 if @user_story.nil?
    return render :json => { :error => "User Story with ID #{params[:user_story_id]} cannot be found in the project #{@project.repo_name}"}, :status => 404 if @user_story.project != @project

    vote = Vote.new :person => current_user, :user_story => @user_story, :vote => params[:vote]

    if vote.save
      return render :json => {:success => "Vote added successfully"}
    else
      return render :json => { :error => "Unable to vote on story: #{@user_story.identifier}" }, :status => 400
    end
  end
end
