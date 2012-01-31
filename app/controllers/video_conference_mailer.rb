class VideoConferenceMailer < ActionMailer::Base

  def request(email_from,email_to,request)
    recipients  email_to
    from email_from
    bcc current_user.email
    subject "Talho: Video Conference \"#{request['title']}\" has been requested"
    body :request => request
  end

end




