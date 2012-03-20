Feature: Teleconference Request Form
  In order to request the setup of a teleconference resource via Email
  As a TALHO member
  I want to submit the Teleconference Request

  Background:
    Given the following entities exist:
      | Role         | Staff  | talho |
      | Jurisdiction | Texas  |       |
      | Jurisdiction | Collin |       |
    And Texas is the parent jurisdiction of:
      | Collin |
    And the following users exist:
      | Staff Collin | staff.collin@example.com | Staff | Collin |
    And delayed jobs are processed
    And "staff.collin@example.com" has the phone "888-555-4444"

  Scenario: Submit a Teleconference Request with verifying field validations
    Given I am logged in as "staff.collin@example.com"
    And I navigate to "Apps > TALHO > Request Forms > Teleconference"

    Then I should see "Staff Collin"
  #within "Assigned Site Coordinator Name"
#    And I should see "8885554444" within "#form[coord_phone]"

    When I fill in "Conference Title" with ""
    And I fill in "Number of Participants" with "888888"
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
    And I wait for 1 seconds
    Then the "Coordinator Name" field should be invalid

    When I fill in "Coordinator Phone" with "six"
    And I fill in "Start Time" with "08:00 PM"
    Then the "Coordinator Phone" field should be invalid

    When I fill in "Number of Participants" with "six"
    And I fill in "End Time" with "10:00 PM"
    Then the "Number of Participants" field should be invalid

    When I fill in "Coordinator Name" with "Red Buttons"
    And I fill in "Coordinator Phone" with "888-555-2222"
    And I fill in "Number of Participants" with "6"
    And I press "Submit"
    And I wait for the "Please wait..." mask to go away
    And delayed jobs are processed

    Then a talho conference request from "staff.collin@example.com" should be sent containing:
      | Bowling Tonight |
      | 01/01/2022      |
      | 08:00 PM        |
      | 10:00 PM        |
      | Red Buttons     |
      | 888-555-2222    |
      | 6               |
    Then the "Success" window should be open
    And I press "OK"
