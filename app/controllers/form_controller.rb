class FormController < ApplicationController

  @email_to = 'conference@talho.org'
  @email_from = 'Admin@talho.org'

  def teleconference
    TeleConferenceMailer.deliver_request(@email_from,@email_to,params[:form])
    render :json => {:success => true}
  end
  
  def video_conference
    # mend javascript foolishness, I just got exhausted
    par = []
    params[:form][:participant].each{|k,v| par << v}
    params[:form][:participant] = par
    VideoConferenceMailer.deliver_request(@email_from,@email_to,params[:form])
    render :json => {:success => true}
  end

  def help_request
    HelpRequestMailer.deliver_request(@email_from,@email_to,params[:form])
    render :json => {:success => true}
  end
end