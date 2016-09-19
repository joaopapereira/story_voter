  json.id user_story.id
  json.identifier user_story.identifier
  json.title user_story.title
  json.url user_story.url
  json.votes
  json.votes user_story.votes do |vote|
    json.person do
      json.partial! 'people/person', person: vote.person
    end
    json.vote vote.vote
  end
