class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.references :user_story, index: true, foreign_key: true
      t.references :person, index: true, foreign_key: true
      t.integer :vote

      t.timestamps
    end
  end
end
