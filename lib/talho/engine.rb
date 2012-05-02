
module Talho
  class Engine < Rails::Engine
    
    config.after_initialize do 
      begin
        $public_roles = [] unless defined?($public_roles)
        r = Role.find_by_name_and_application('Dashboard', 'talho')
        $public_roles << r.id unless r.nil?
      rescue
      end
    end
    
  end
end