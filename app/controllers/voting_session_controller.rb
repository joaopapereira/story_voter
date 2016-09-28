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
    sessions = VotingSession.includes(:person, :project).find_by_project(@project).open
    render :json => {:sessions => sessions}
  end

  private

  def voting_session_params
    params.require(:voting_session).permit([:start_date, :end_date])
  end

end
