Openphin::Application.routes.draw do
  namespace :talho do 
    match '/talho/video_conference', :to => 'form#video_conference', :as => :talho_video_conference, :via => :post
    match '/talho/teleconference', :to => 'form#teleconference', :as => :talho_teleconference, :via => :post
    match '/talho/help_request', :to => 'form#help_request', :as => :talho_help_request, :via => :post

    resources :users, :only=> [:new, :create]
  end
end
