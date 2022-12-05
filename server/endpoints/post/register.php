<?php

require_once('../endpointIncludes.php');
assertRequestMethod('POST');

/**
 * Endpoint to register a new user.
 */
$_POST = json_decode(file_get_contents("php://input"),true);
$hashed = sha1($_POST['password']);

// prepare the SQL statement
$sql = "INSERT INTO RegisteredUsers (email, password, fullname, creditcardnumber, expirydate, cvc)
      VALUES('$_POST[email]', '$hashed', '$_POST[fullname]', '$_POST[creditcardnumber]', '$_POST[expirydate]', '$_POST[cvc]')";

$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format