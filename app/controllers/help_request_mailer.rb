class HelpRequestMailer < ActionMailer::Base

  def request(email_from,email_to,request)
    bcc  email_to
    from email_from
    subject "Talho: Technical Help has been requested by #{request['requester']['name']}"
    body :request => request
  end

end




