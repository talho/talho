class VideoConferenceMailer < ActionMailer::Base

  def req(email_from,email_to,request)
    @request = request
    mail(to: email_to,
      from: email_from,
      bcc: request['requester']['email'],
      subject: 'Talho: Video Conference ' + request['title'] + ' has been requested')
  end

end





