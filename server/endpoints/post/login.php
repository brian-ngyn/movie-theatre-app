<?php

include_once('../endpointIncludes.php');
assertRequestMethod('POST');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM Movies";
  $result = DBConnection->getInstance().query($sql);
}

echo "Test6";