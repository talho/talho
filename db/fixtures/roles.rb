p 'Writing Roles'
r = Role.find_or_create_by_name_and_approval_required_and_user_role_and_application('Admin', true, false, 'talho')
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_application('Member', 'talho')
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_application('Director', 'talho')
p "#{r.name} - #{r.application}"