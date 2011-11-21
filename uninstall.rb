parent_lib_dir = File.join(Rails.root, "lib")
[ "workers" ].each { |lib_subdir|
  target = File.join(parent_lib_dir, lib_subdir, "talho")
  File.unlink(target) if File.exists?(target)
}

target = "#{Rails.root}/vendor/plugins/talho/spec/spec_helper.rb"
File.unlink(target) if File.exists?(target)

parent_public_dir = File.join(Rails.root, "public")
[ "javascripts", "stylesheets" ].each { |public_subdir|
  target = File.join(parent_public_dir, public_subdir, "talho")
  File.unlink(target) if File.exists?(target)
}
