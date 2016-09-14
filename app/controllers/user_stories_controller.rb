class UserStoriesController < ApplicationController
  def index
    render json: {:project => Project.find_by_id(params[:project_id]), :user_stories => UserStory.find_by_project_id(params[:project_id])}
  end
end
