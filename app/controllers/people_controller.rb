class PeopleController < ApplicationController
  def new
  end

  def show
    render :json => { :error => 'User ID not found' }, :status => 401 unless params.include? :id
    @person = Person.find_by_id params[:id]
    render :json => {:error => "Unable to find user with id #{params[:id]}"}, :status => 404 if @person.nil?
    
  end
end
