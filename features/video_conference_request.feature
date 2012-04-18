Feature: Video Conference Request Form
  In order to request the setup of a video conference resource via Email
  As a TALHO member
  I want to submit the Video Conference Request

  Background:
    Given the following entities exist:
      | Role         | Staff  | talho |
      | Jurisdiction | Texas  |       |
      | Jurisdiction | Collin |       |
    And Texas is the parent jurisdiction of:
      | Collin |
    And the following users exist:
      | Staff Collin | staff.collin@example.com | Staff | Collin | talho |
    And delayed jobs are processed
    And "staff.collin@example.com" has the phone "888-555-4444"

  Scenario: Submit a Teleconference Request with verifying field validations
    Given I am logged in as "staff.collin@example.com"
    And I navigate to the ext dashboard page
    And I navigate to "Apps > TALHO > Request Forms > Video Conference"

#    Then I should see "Staff Collin" within "#video_coord_name"
  #within "Assigned Site Coordinator Name"
#    And I should have "8885554444" within "#video_coord_phone"
  #within "#form[coord_phone]"
#    Then I should see "Staff Collin" within display field "Assigned Site Coordinator Name"

    When I fill in "Conference Title" with ""
    And I fill in "Coordinator Name" with "Amazing"
    And I wait for 1 seconds
    Then the "Conference Title" field should be invalid

    When I fill in "Date" with "00/"
    And I fill in "Conference Title" with "Bowling Tonight"
    Then the "Date" field should be invalid

    # verify that a day prior to today is invalid
    When I fill in "Date" with "01/01/2011"
    And I fill in "Conference Title" with "Bowling Tonight"
    Then the "Date" field should be invalid

    When I fill in "Coordinator Name" with ""
    And I fill in "Date" with "01/01/2022"
    Then the "Coordinator Name" field should be invalid

    When I fill in "Coordinator Phone" with "six"
    And I fill in "Start Time" with "08:00 PM"
    Then the "Coordinator Phone" field should be invalid

    When I fill in "End Time" with "10:00 PM"
    And I fill in "Coordinator Name" with "Red Buttons"
    And I fill in "Coordinator Phone" with "888-555-2222"

    And I press "Add Participant"

    And I fill in "participant-name" with ""
    And I fill in "participant-teleconf" with "Just to change focus"
    Then the "participant-name" field should be invalid

    And I fill in "participant-location" with ""
    And I fill in "participant-name" with "Jane Smith"
    Then the "participant-location" field should be invalid

    And I fill in "participant-email" with ""
    And I fill in "participant-location" with "Water Tower"
    Then the "participant-email" field should be invalid

    And I fill in "participant-phone" with ""
    And I fill in "participant-email" with "jane.smith@example.com"
    Then the "participant-phone" field should be invalid

    And I fill in "participant-phone" with "888-555-4444"
    And I fill in "participant-video" with ""
    And I fill in "participant-teleconf" with ""

    And I press "Save"

    And I press "Submit"
    And delayed jobs are processed

    Then a talho conference request from "staff.collin@example.com" should be sent containing:
      | Bowling Tonight        |
      | 01/01/2022             |
      | 8:00 PM                |
      | 10:00 PM               |
      | Red Buttons            |
      | 888-555-2222           |
      | Jane Smith             |
      | Water Tower            |
      | jane.smith@example.com |
      | 888-555-4444           |
    Then the "Success" window should be open
    And I press "OK"

  Scenario: Submit a Teleconference Request with more than one participant
    Given I am logged in as "staff.collin@example.com"
    And I navigate to the ext dashboard page
    And I navigate to "Apps > TALHO > Request Forms > Video Conference"

    When I fill in "Conference Title" with "Bowling Tonight"
    And I fill in "Date" with "01/01/2022"
    And I fill in "Start Time" with "08:00 PM"
    And I fill in "End Time" with "10:00 PM"
    And I fill in "Coordinator Name" with "Red Buttons"
    And I fill in "Coordinator Phone" with "888-555-2222"
    Then I should see "Remove Participant"

    When I press "Add Participant"
    And I fill in "participant-name" with "Jane Smith"
    And I press "Cancel"
    Then I should not see "Jane Smith"

    When I press "Add Participant"
    And I fill in "participant-name" with "Jane Smith"
    And I fill in "participant-location" with "Water Tower"
    And I fill in "participant-email" with "jane.smith@example.com"
    And I fill in "participant-phone" with "888-555-4444"
    And I fill in "participant-video" with "Samsung 46inch LED TV"
    And I fill in "participant-teleconf" with "CISCO 4466JS"
    And I press "Save"

    And I press "Add Participant"
    And I fill in "participant-name" with "Jade Frieder"
    And I fill in "participant-location" with "Pyrotechnic Locker"
    And I fill in "participant-email" with "jade.frieder@example.com"
    And I fill in "participant-phone" with "888-555-3311"
    And I fill in "participant-video" with "Polycom Big Boy"
    And I fill in "participant-teleconf" with "Panasonic 2 line conf"
    And I press "Save"
    And I press "Remove Participant"
    Then I should not see "Jade Frieder"

    And I press "Add Participant"
    And I fill in "participant-name" with "Jade Frieder"
    And I fill in "participant-location" with "Pyrotechnic Locker"
    And I fill in "participant-email" with "jade.frieder@example.com"
    And I fill in "participant-phone" with "888-555-3311"
    And I fill in "participant-video" with "Polycom Big Boy"
    And I fill in "participant-teleconf" with "Panasonic 2 line conf"
    And I press "Save"

    And I press "Submit"
    And delayed jobs are processed

    Then a talho conference request from "staff.collin@example.com" should be sent containing:
      | Bowling Tonight          |
      | 01/01/2022               |
      | 8:00 PM                  |
      | 10:00 PM                 |
      | Red Buttons              |
      | 888-555-2222             |
      | Jane Smith               |
      | Water Tower              |
      | jane.smith@example.com   |
      | 888-555-4444             |
      | Samsung 46inch LED TV    |
      | CISCO 4466JS             |
      | Jade Frieder             |
      | Pyrotechnic Locker       |
      | jade.frieder@example.com |
      | 888-555-3311             |
      | Polycom Big Boy          |
      | Panasonic 2 line conf    |
    And the "Success" window should be open
    And I press "OK"
