<?php

require_once('../endpointIncludes.php');
assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"),true);

$hashed = sha1($_POST['password']);

/**
 * Endpoint to login a user based on email and password
 */
$sql = "SELECT * FROM RegisteredUsers WHERE email = '$_POST[email]' AND password = '$hashed'"; // prepare the SQL statement
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format