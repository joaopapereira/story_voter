json.projects @projects do |project|
  json.id project.id
  json.name project.name
  json.repo_name project.repo_name
end