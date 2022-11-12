# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2019_08_18_152109) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "comments", id: :serial, force: :cascade do |t|
    t.integer "post_id"
    t.string "author"
    t.string "email"
    t.text "content"
    t.integer "approved"
    t.integer "parent"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "enclosures", force: :cascade do |t|
    t.string "url"
    t.integer "size"
    t.string "mime_type"
    t.integer "episode_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "episodes", force: :cascade do |t|
    t.string "title"
    t.string "guid"
    t.string "summary"
    t.integer "number"
    t.string "episode_type"
    t.integer "duration"
    t.boolean "explicit"
    t.string "image"
    t.integer "podcast_id"
    t.integer "post_id"
    t.integer "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "website"
    t.string "podcast_type"
    t.integer "user_id"
    t.string "feed"
    t.string "image"
    t.string "category"
    t.string "subcategory"
    t.boolean "explicit", default: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "slug"
    t.string "state"
    t.string "header_image"
    t.bigint "external_id"
  end

  create_table "post_categories", id: :serial, force: :cascade do |t|
    t.integer "post_id"
    t.integer "category_id"
    t.index ["category_id"], name: "index_post_categories_on_category_id"
    t.index ["post_id"], name: "index_post_categories_on_post_id"
  end

  create_table "post_tags", id: :serial, force: :cascade do |t|
    t.integer "post_id"
    t.integer "tag_id"
    t.index ["post_id"], name: "index_post_tags_on_post_id"
    t.index ["tag_id"], name: "index_post_tags_on_tag_id"
  end

  create_table "posts", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "body"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "feature_image"
    t.string "feature_link"
    t.string "state"
    t.integer "user_id"
    t.datetime "published_at", precision: nil
    t.index ["slug"], name: "index_posts_on_slug", unique: true
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "is_admin", default: false
    t.string "first_name"
    t.string "last_name"
    t.string "pen_name"
  end

end
