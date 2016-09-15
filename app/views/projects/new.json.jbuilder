json.projects @projects do |project|
  json.partial! 'projects/project', project: project
end
