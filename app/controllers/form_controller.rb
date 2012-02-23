class FormController < ApplicationController

  CONFERENCE_EMAIL = 'conference@talho.org'

  def teleconference
    begin
      request = params[:form]
      request[:requester] = {:name=>current_user.name,:email=>current_user.email}
      TeleConferenceMailer.deliver_request(DO_NOT_REPLY,CONFERENCE_EMAIL,request)
      render :json => {:success => true}
    rescue StandardError => e
      render :json => {:success => false}
    end
  end
  
  def video_conference
    begin
      request = params[:form]
      request[:requester] = {:name=>current_user.name,:email=>current_user.email}
      VideoConferenceMailer.deliver_request(DO_NOT_REPLY,CONFERENCE_EMAIL,request)
      render :json => {:success => true}
    rescue StandardError => e
      render :json => {:success => false}
    end
  end

  def help_request
    HelpRequestMailer.deliver_request(DO_NOT_REPLY,CONFERENCE_EMAIL,params[:form])
    render :json => {:success => true}
  end
end