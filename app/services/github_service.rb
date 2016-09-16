class GithubService
  def connect
    Octokit::Client.new \
      :client_id     => ENV['github_key'],
      :client_secret => ENV['github_secret']
  end
  def get_all_projects person
    connection = connect
    all_projects = connection.repos(person.username)
    result = []
    all_projects.each do |project|
      result << Github.to_project(project)
    end
    result
  end
end
