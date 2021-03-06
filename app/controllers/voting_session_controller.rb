class VotingSessionController < ApplicationController
  def create
      return render :json => { :error => 'Need to login first' }, :status => 401 if current_user.nil?
      @project = Project.find_by_id(params[:project_id])
      return render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 402 if @project.nil?

      @session = VotingSession.new(:project => @project, :person => current_user)
      @session.assign_attributes(voting_session_params)
      if @session.valid?
        @session.save
        return render :json => {:success => "Session created"}, :status => 200
      else
        return render :json => {:error => @session.errors}, :status => 400
      end
  end

  def index
    @project = Project.find_by_id(params[:project_id])
    return render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 402 if @project.nil?
    sessions = VotingSession.includes(:person, :project, :user_stories).find_by_project(@project).open
    render :json => {:sessions => sessions}
  end

  def show
    project = Project.find_by_id(params[:project_id])
    return render :json => { :error => "Project with ID #{params[:project_id]} cannot be found"}, :status => 402 if project.nil?
    session = VotingSession.find_by_id(params[:id])
    return render :json => { :error => "Voting session with ID #{params[:id]} cannot be found"}, :status => 402 if session.nil?
    return render :json => { :error => "Voting session is not part of the project"}, :status => 400 if session.project.id != project.id
    render :json => {:session => session}
  end

  private

  def voting_session_params
    params.require(:voting_session).permit([:start_date, :end_date])
  end

end
