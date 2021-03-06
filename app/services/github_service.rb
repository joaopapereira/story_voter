class GithubService
  def connect
    Octokit::Client.new \
      :client_id     => ENV['github_key'],
      :client_secret => ENV['github_secret']
  end
  def get_all_projects person
    connection = connect
    result = get_projects person.username
    connection.organizations(person.username).each do |organization|
      result += get_projects(organization.login)
    end
    result
  end

  def get_all_open_issues project
    result = []
    num_open_issues = 1
    current_page = 1
    while num_open_issues != 0
      issues = get_one_page_open_issues project, current_page
      current_page += 1
      num_open_issues = issues.length
      result = result + issues
    end
    result
  end
  private

  def get_one_page_open_issues project, page
    connection = connect
    all_issues = connection.list_issues(project.repo_name, {:state => "open", :page => page})
    result = []
    all_issues.each do |user_story|
      result << Github.to_user_story(project, user_story)
    end
    result
  end

  def get_one_page_repositories login, page
    connection = connect
    all_repos = connection.repos(login, {:page => page})
    result = []
    all_repos.each do |project|
      result << Github.to_project(project)
    end
    result
  end

  def generate_projects all_projects
    result = []
    all_projects.each do |project|
      result << Github.to_project(project)
    end
    result
  end

  def get_projects login
    num_repos = 1
    current_page = 1
    result = []
    while num_repos != 0
      repos = get_one_page_repositories login, current_page
      current_page += 1
      num_repos = repos.length
      result = result + repos
    end
    result
  end
end
