ActionController::Routing::Routes.draw do |map|
  map.talho_video_conference '/talho/video_conference', :controller => :form, :action => :video_conference, :method => 'POST'
  map.talho_teleconference '/talho/teleconference', :controller => :form, :action => :teleconference, :method => 'POST'
  map.talho_help_request '/talho/help_request', :controller => :form, :action => :help_request, :method => 'POST'
end
