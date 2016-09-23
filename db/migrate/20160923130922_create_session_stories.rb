class CreateSessionStories < ActiveRecord::Migration[5.0]
  def change
    create_table :session_stories do |t|
      t.references :voting_sessions, foreign_key: true
      t.references :user_stories, foreign_key: true

      t.timestamps
    end
  end
end
