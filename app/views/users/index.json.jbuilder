json.array! @users do |user| #このインスタンス変数来てるの？
  json.id user.id
  json.name user.name
end