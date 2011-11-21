require 'spec/rake/spectask'

PLUGIN = "vendor/plugins/talho"

namespace :spec do
  desc "Run the Talho spec tests"
  Spec::Rake::SpecTask.new(:talho) do |t|
    t.spec_files = FileList["#{PLUGIN}/spec/**/*_spec.rb"]
  end
end
