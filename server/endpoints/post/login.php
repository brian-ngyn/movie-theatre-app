<?php

include_once('../endpointIncludes.php');
assertRequestMethod('POST');


  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM Movies";
  $result = DBConnection::getInstance()->query($sql);
  

echo "Test6";