begin
  require 'cucumber/rake/task'

  ENV["RAILS_ENV"] ||= "cucumber"

  namespace :cucumber do
    desc = "Talho plugin, add any cmd args after --"
    Cucumber::Rake::Task.new(:talho, desc) do |t|
      t.cucumber_opts = "-r features " +
#                        "-r vendor/plugins/talho/spec/factories.rb " +
                        "-r vendor/plugins/talho/features/ " +
                        " #{ARGV[1..-1].join(" ") if ARGV[1..-1]}" +
                        # add all Talho features if none are passed in
                        (ARGV.grep(/vendor/).empty? ? "vendor/plugins/talho/features" : "")
      t.fork = true
      t.profile = 'default'
    end
  end
rescue LoadError
  # to catch if cucmber is not installed, as in production
end
