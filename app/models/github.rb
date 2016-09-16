class Github
  include ActiveModel::Model
  def self.all_projects person
    projects = GithubService.new.get_all_projects person
  end

  def self.new_projects person
    result = []
    all_projects(person).each do |project|
      result << project if Project.find_by_repo_name(project.repo_name).nil?
    end
    result
  end

  def self.to_project(project)
    proj = Project.new
    proj.name = project[:name]
    proj.repo_name = project[:full_name]
    proj
  end
end
