class FormController < ApplicationController

  CONFERENCE_EMAIL = 'conference@talho.org'
  HELPDESK_EMAIL = 'admins@texashan.org'

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
    begin
      request = params[:form]
      HelpRequestMailer.deliver_request(DO_NOT_REPLY,HELPDESK_EMAIL,request)
      render :json => {:success => true}
    rescue StandardError => e
      render :json => {:success => false}
    end
  end
end