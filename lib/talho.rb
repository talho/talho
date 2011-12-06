# Require Talho models
Dir[File.join(File.dirname(__FILE__), 'models', '*.rb')].each do |f|
  require f
end

# Add PLUGIN_NAME vendor/plugins/*/lib to LOAD_PATH
Dir[File.join(File.dirname(__FILE__), '../vendor/plugins/*/lib')].each do |path|
  $LOAD_PATH << path
end

# Require any submodule dependencies here
# For example, if this depended on open_flash_chart you would require init.rb as follows:
#   require File.join(File.dirname(__FILE__), '..', 'vendor', 'plugins', 'open_flash_chart', 'init.rb')

# Register the plugin expansion in the $expansion_list global variable
$expansion_list = [] unless defined?($expansion_list)
$expansion_list.push(:talho) unless $expansion_list.index(:talho)

$menu_config = {} unless defined?($menu_config)
                    
$menu_config[:talho] = <<EOF
  nav = "{name: 'TALHO', items:[
           {name: 'Training', items: [
             //{name: 'Rollcall', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'rollcall'}},
             {name: 'RODS', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'RODS'}},
             {name: 'ESSENCE', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'ESSENCE'}},
             {name: 'Communication and Power Trailers', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'trailer'}},
             {name: 'Video Conferencing', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'video'}},
             {name: 'Other TALHO Training', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'other'}}
           ]},
           {name: 'Request Forms', items: [
             {name: 'Teleconference', tab: {title: 'Teleconference Request Form', initializer: 'Talho.TALHO.controller.Teleconference'}},
             {name: 'Video Conference', tab: {title: 'Video Conference Request Form', initializer: 'Talho.TALHO.controller.VideoConference'}},
             {name: 'Help Desk Ticket', tab: {title: 'Help Desk Ticket Request Form', initializer: 'Talho.TALHO.controller.HelpDeskTicket'}}
           ]},
           {name: 'Support Information', tab: {title: 'Support Information', initializer: 'Talho.TALHO.controller.Support'}}
         ]}"
EOF

# Register any required javascript or stylesheet files with the appropriate
# rails expansion helper
ActionView::Helpers::AssetTagHelper.register_javascript_expansion(
  :talho => ["talho/script_config"])
ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion(
  :talho => [
    # add any necessary stylesheets like "talho/cool_css_stuff.css"
  ])
