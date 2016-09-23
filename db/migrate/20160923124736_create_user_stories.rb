class CreateUserStories < ActiveRecord::Migration[5.0]
  def change
    create_table :user_stories do |t|
      t.references :project, index: true, foreign_key: true
      t.string :identifier
      t.string :title
      t.string :url

      t.timestamps
    end
  end
end
