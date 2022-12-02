<?php

include_once('../endpointIncludes.php');
assertRequestMethod('POST');

$sql = "INSERT INTO RegisteredUsers (email, password, fullname, creditcardnumber, expirydate, cvc)
      VALUES('$_POST[email]', '$_POST[password]', '$_POST[fullname]', '$_POST[creditcardnumber]', '$_POST[expirydate]', '$_POST[cvc]')";

$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);