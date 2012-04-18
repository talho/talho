class TeleConferenceMailer < ActionMailer::Base

  def req(email_from,email_to,request)
    @request = request
    mail(to:  email_to,
    from: email_from,
    bcc: request['requester']['email'],
    subject: "Talho: Teleconference \"#{request['title']}\" has been requested")
  end

end




