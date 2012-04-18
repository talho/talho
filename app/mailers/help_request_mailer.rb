class HelpRequestMailer < ActionMailer::Base

  def req(email_from,email_to,request)
    @request = request
    mail(to:  email_to,
    from: email_from,
    bcc: request['requester']['email'],
    subject: "Talho: Technical Help has been requested by #{request['requester']['name']}")
  end

end




