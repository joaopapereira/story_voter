class CreateVotingSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :voting_sessions do |t|
      t.references :project, foreign_key: true
      t.references :person, foreign_key: true
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
