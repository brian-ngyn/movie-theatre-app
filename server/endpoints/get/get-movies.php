<?php



include_once('../endpointIncludes.php');
assertRequestMethod('GET');
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
  $sql = "SELECT * FROM Movies";
  $result = DBConnection->getInstance().query($sql);
}

echo "Test6";