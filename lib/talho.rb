                    
# Tell the main app that this extension exists
$extensions = [] unless defined?($extensions)
$extensions << :talho
             
$menu_config = {} unless defined?($menu_config)
$menu_config[:talho] = <<EOF
  nav = "{name: 'TALHO', items:[
           {name: 'Training', items: [
             //{name: 'Rollcall', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'rollcall', id: 'talho_training'}},
             {name: 'RODS', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'RODS', id: 'talho_training'}},
             {name: 'ESSENCE', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'ESSENCE', id: 'talho_training'}},
             {name: 'Communication and Power Trailers', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'trailer', id: 'talho_training'}},
             {name: 'Video Conferencing', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'video', id: 'talho_training'}},
             {name: 'Other TALHO Training', tab: {title: 'Training', initializer: 'Talho.TALHO.controller.Training', section: 'other', id: 'talho_training'}}
           ]},
           {name: 'Request Forms', items: [
             {name: 'Teleconference', tab: {title: 'Teleconference Request Form', initializer: 'Talho.TALHO.controller.Teleconference', id: 'talho_teleconference'}},
             {name: 'Video Conference', tab: {title: 'Video Conference Request Form', initializer: 'Talho.TALHO.controller.VideoConference', id: 'talho_videoconference'}},
             {name: 'Help Desk Ticket', tab: {title: 'Help Desk Ticket Request Form', initializer: 'Talho.TALHO.controller.HelpDeskTicket', id: 'talho_helpdeskticket'}}
           ]},
           {name: 'Support Information', tab: {title: 'Support Information', initializer: 'Talho.TALHO.controller.Support', id: 'talho_supportinfo'}}
         ]}"
EOF

$extensions_js = {} unless defined?($extensions_js)
$extensions_js[:talho] = [ "talho/script_config.js" ]
  
module Talho
end

require 'talho/engine'