app = App.find_by_name('talho')

p 'Writing Roles'
r = Role.find_or_create_by_name_and_user_role_and_app_id('Dashboard', false, app.id) do |role|
  role.public = true
end
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_user_role_and_app_id('Admin', false, app.id)
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_user_role_and_app_id('Staff', true, app.id)
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_user_role_and_app_id('Director', true, app.id)
p "#{r.name} - #{r.application}"