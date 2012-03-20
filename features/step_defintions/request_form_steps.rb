Then /^a talho conference request from "([^"]*)" should be sent containing:$/ do |email_from, expected|
  sent = ActionMailer::Base.deliveries.first
  assert_equal [DO_NOT_REPLY],                     sent.from
  assert_equal [email_from],                       sent.bcc
  assert_equal [FormController::CONFERENCE_EMAIL], sent.to
  assert_match /#{h expected.raw[0].first}/,       sent.subject
  expected.raw.each do |row|
    assert_match /#{row[0]}/, sent.body
  end
end

Then /^a talho helpdesk request from "([^"]*)" should be sent containing:$/ do |email_from, expected|
  sent = ActionMailer::Base.deliveries.first
  assert_equal [DO_NOT_REPLY],                   sent.from
  assert_equal [email_from],                     sent.bcc
  assert_equal [FormController::HELPDESK_EMAIL], sent.to
  assert_match /#{h expected.raw[0].first}/,     sent.subject
  expected.raw.each do |row|
    assert_match /#{row[0]}/, sent.body
  end
end

