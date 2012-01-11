class TeleConferenceMailer < ActionMailer::Base

  def request(email_from,email_to,request)
    bcc  email_to
    from email_from
    subject "Talho: Teleconference \"#{request['title']}\" has been requested"
    body :request => request
  end

end




