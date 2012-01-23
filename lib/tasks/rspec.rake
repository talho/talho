require "rspec/core/rake_task"

PLUGIN = "vendor/plugins/talho"

namespace :spec do
  desc "Run the Talho spec tests"
  RSpec::Core::RakeTask.new(:talho) do |spec|
    spec.pattern = "#{PLUGIN}/spec/**/*_spec.rb"
  end
end
