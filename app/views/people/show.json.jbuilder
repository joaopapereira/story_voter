json.person @person do |person|
  json.partial! 'people/person', person: person
end
