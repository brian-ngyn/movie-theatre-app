<?php

require_once('../endpointIncludes.php');
require_once("../classes/Strategy/CancelStrategy.php");
require_once("../classes/Strategy/CancelRegisteredUser.php");
require_once("../classes/Strategy/CancelGuest.php");
require_once("../classes/Strategy/CancelContext.php");

// immediately check if user_email exists in RegisteredUsers
// if not, set strategy

assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"), true);

$strategy_context = new CancelContext($_POST);
// check to see if user_email exists in RegisteredUsers
// if it does, set strategy to RegisteredUserStrategy
// if it doesn't, set strategy to GuestStrategy

$sql = "SELECT * FROM RegisteredUsers WHERE email = '$_POST[user_email]'";
$result = DBConnection::getInstance()->query($sql);
if ($result->num_rows > 0) {
    $strategy_context->setStrategy(new CancelRegisteredUser());
} else {
    $strategy_context->setStrategy(new CancelGuest());
}

$strategy_context->performCancel();

$sql = "INSERT INTO Payment (payment_amount, user_email, card_number, expiry_date, cvc) 
        VALUES ('$_POST[payment_amount]', '$_POST[user_email]', '$_POST[card_number]', '$_POST[expiry_date]', '$_POST[cvc]')";
$resultToSend = DBConnection::getInstance()->query($sql);


