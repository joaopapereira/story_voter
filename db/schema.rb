# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160923130954) do

  create_table "people", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name"
    t.string   "repo_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "session_stories", force: :cascade do |t|
    t.integer  "voting_session_id"
    t.integer  "user_story_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["user_story_id"], name: "index_session_stories_on_user_story_id"
    t.index ["voting_session_id"], name: "index_session_stories_on_voting_session_id"
  end

  create_table "user_stories", force: :cascade do |t|
    t.integer  "project_id"
    t.string   "identifier"
    t.string   "title"
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_user_stories_on_project_id"
  end

  create_table "votes", force: :cascade do |t|
    t.integer  "session_story_id"
    t.integer  "person_id"
    t.integer  "vote"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["person_id"], name: "index_votes_on_person_id"
    t.index ["session_story_id"], name: "index_votes_on_session_story_id"
  end

  create_table "voting_sessions", force: :cascade do |t|
    t.integer  "project_id"
    t.integer  "person_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["person_id"], name: "index_voting_sessions_on_person_id"
    t.index ["project_id"], name: "index_voting_sessions_on_project_id"
  end

end
