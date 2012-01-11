p 'Writing Roles'
r = Role.find_or_create_by_name_and_approval_required_and_user_role_and_application('Dashboard', false, false, 'talho')
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_approval_required_and_user_role_and_application('Admin', true, false, 'talho')
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_approval_required_and_user_role_and_application('Staff', true, true, 'talho')
p "#{r.name} - #{r.application}"
r = Role.find_or_create_by_name_and_approval_required_and_user_role_and_application('Director', true, true, 'talho')
p "#{r.name} - #{r.application}"