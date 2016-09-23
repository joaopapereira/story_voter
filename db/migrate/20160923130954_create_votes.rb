class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.references :session_stories, foreign_key: true
      t.references :person, foreign_key: true
      t.integer :vote

      t.timestamps
    end
  end
end
