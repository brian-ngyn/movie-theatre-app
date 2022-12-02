<?php

include_once('../endpointIncludes.php');
assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"),true);

$hashed = sha1($_POST['password']);
// print_r($_POST);

$sql = "SELECT * FROM RegisteredUsers WHERE email = '$_POST[email]' AND password = '$hashed'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);