class VideoConferenceMailer < ActionMailer::Base

  def request(email_from,email_to,request)
    recipients  email_to
    from email_from
    subject "Talho: Video Conference \"#{request['title']}\" has been requested"
    body :request => request
  end

end




