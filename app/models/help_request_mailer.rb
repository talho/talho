class HelpRequestMailer < ActionMailer::Base

  def request(email_from,email_to,request)
    recipients  email_to
    from email_from
    bcc request['requester']['email']
    subject "Talho: Technical Help has been requested by #{request['requester']['name']}"
    body :request => request
  end

end




