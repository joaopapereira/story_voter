class AddTitleAndUrlToUserStories < ActiveRecord::Migration[5.0]
  def change
    add_column :user_stories, :title, :string
    add_column :user_stories, :url, :string
  end
end
