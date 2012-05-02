begin
  require "rspec/core/rake_task"
  
  plugin = "vendor/plugins/talho"
  
  namespace :spec do
    desc "Run the Talho spec tests"
    RSpec::Core::RakeTask.new(:talho) do |spec|
      spec.pattern = "#{plugin}/spec/**/*_spec.rb"
    end
  end

rescue LoadError
end