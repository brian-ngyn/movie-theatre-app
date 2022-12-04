<?php

include_once('../endpointIncludes.php');
assertRequestMethod('GET');

// immediately check if user_email exists in RegisteredUsers
// if not, set strategy

$sql = "SELECT * FROM Payment WHERE user_email='$_GET[user_email]' AND payment_id='$_GET[payment_id]'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);