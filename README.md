# README
# C-Space

# Normal tables

## users table
|column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|passwords|string|null: false|
|email|string|null: false, unique: true|

### users Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users

## messages table
|column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|body|text||
|image|text||

### messages Association
- belongs_to :user
- belongs_to :group

## groups table
|column|Type|Options|
|------|----|-------|
|title|string|index: true, null: fase|

## groups Association
- has_many :users through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_users table
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### groups_users Association
- belongs_to :group
- belongs_to :user





