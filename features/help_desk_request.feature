Feature: Help Desk Ticket
  In order to request help from the Help Desk via Email
  As a TALHO member
  I want to submit the Help Desk Ticket

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

  Scenario: Submit a Help Request with verifying field validations
    Given I am logged in as "staff.collin@example.com"
    And I navigate to the ext dashboard page
    And I navigate to "Apps > TALHO > Request Forms > Help Desk Ticket"

#    Then I should see "Staff Collin"
#    Then I should see "8885554444"
#    Then I should see "staff.collin@example.com"

    When I fill in "Name" with ""
    When I fill in "Describe Technical Issue" with "just to change focus"
    And I wait for 1 seconds
    Then the "Name" field should be invalid

    When I fill in "Health Department" with ""
    When I fill in "Describe Technical Issue" with "just to change focus"
    Then the "Health Department" field should be invalid

    When I fill in "Phone" with ""
    When I fill in "Describe Technical Issue" with "just to change focus"
    Then the "Phone" field should be invalid

    When I fill in "Email" with ""
    When I fill in "Describe Technical Issue" with "just to change focus"
    Then the "Email" field should be invalid

    When I fill in "Describe Technical Issue" with ""
    When I fill in "Name" with "just to change focus"
    Then the "Describe Technical Issue" field should be invalid

    When I fill in "Name" with "Staff Collin"
    When I fill in "Health Department" with "Bexar County"
    When I fill in "Phone" with "888-555-4444"
    When I fill in "Email" with "staff.collin@example.com"
    When I fill in "Describe Technical Issue" with "I have a headache"

    And I press "Submit"
    And delayed jobs are processed

    Then a talho helpdesk request from "staff.collin@example.com" should be sent containing:
      | Staff Collin             |
      | Bexar County             |
      | 888-555-4444             |
      | staff.collin@example.com |
      | I have a headache        |

    Then the "Success" window should be open
    And I press "OK"

