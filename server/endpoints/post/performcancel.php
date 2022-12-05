<?php

require_once('../endpointIncludes.php');
require_once("../../classes/Strategy/CancelStrategy.php");
require_once("../../classes/Strategy/CancelRegisteredUser.php");
require_once("../../classes/Strategy/CancelGuest.php");
require_once("../../classes/Strategy/CancelContext.php");

assertRequestMethod('POST');

 /**
  * Endpoint to cancel a ticket, check if user is registered or guest, and set the appropriate cancel Strategy Pattern.
  */

$_POST = json_decode(file_get_contents("php://input"), true);

$user_email = $_POST['displayInformation'][0]['user_email']; // get the user's email
$strategy_context = new CancelContext($_POST); // send the body of the API request to the context

// check to see if user_email exists in RegisteredUsers
// if it does, set strategy to RegisteredUserStrategy
// if it doesn't, set strategy to GuestStrategy

$sql = "SELECT * FROM RegisteredUsers WHERE email = '$user_email'";
$result = DBConnection::getInstance()->query($sql);
if ($result->num_rows > 0) { // if user is registered
    $strategy_context->setStrategy(new CancelRegisteredUser()); // setting the strategy to RegisteredUserStrategy
} else {
    $strategy_context->setStrategy(new CancelGuest()); // setting the strategy to GuestStrategy
}

$strategy_context->performCancel(); // perform the cancel based on the strategy set

