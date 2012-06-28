Openphin::Application.routes.draw do
  namespace :talho do 
    match 'video_conference', :to => 'form#video_conference', :as => :video_conference, :via => :post
    match 'teleconference', :to => 'form#teleconference', :as => :teleconference, :via => :post
    match 'help_request', :to => 'form#help_request', :as => :help_request, :via => :post
  end
end
