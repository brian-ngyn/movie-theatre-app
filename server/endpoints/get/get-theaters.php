<?php

header("Access-Control-Allow-Origin: *");
include_once('./endpointIncludes.php');
assertRequestMethod('GET');

// get request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
  $sql = "SELECT * FROM Theatres";
  $result = DBConnection->getInstance().query($sql);
}

echo "{}";