class VideoConferenceMailer < ActionMailer::Base

  def request(email,report_name)
    bcc  email
    from DO_NOT_REPLY
    subject "Talho: Video Conference \"#{report_name}\" has been requested"
    body :report_name => report_name
  end

end




