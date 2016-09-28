class CreateSessionStories < ActiveRecord::Migration[5.0]
  def change
    create_table :session_stories do |t|
      t.references :voting_session, foreign_key: true
      t.references :user_story, foreign_key: true

      t.timestamps
    end
  end
end
