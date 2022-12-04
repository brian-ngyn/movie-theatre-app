<?php

require_once('../endpointIncludes.php');
require_once("../../classes/Strategy/CancelStrategy.php");
require_once("../../classes/Strategy/CancelRegisteredUser.php");
require_once("../../classes/Strategy/CancelGuest.php");
require_once("../../classes/Strategy/CancelContext.php");

assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"), true);

$user_email = $_POST['displayInformation'][0]['user_email'];

$strategy_context = new CancelContext($_POST);
// check to see if user_email exists in RegisteredUsers
// if it does, set strategy to RegisteredUserStrategy
// if it doesn't, set strategy to GuestStrategy

$sql = "SELECT * FROM RegisteredUsers WHERE email = '$user_email'";
$result = DBConnection::getInstance()->query($sql);
if ($result->num_rows > 0) {
    $strategy_context->setStrategy(new CancelRegisteredUser());
} else {
    $strategy_context->setStrategy(new CancelGuest());
}

$strategy_context->performCancel();

