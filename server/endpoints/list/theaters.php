<?php



include_once('../endpointIncludes.php');
assertRequestMethod('GET');
$method = $_SERVER['REQUEST_METHOD'];

$sql = "SELECT * FROM Theatres";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful();
while ($row = $result->fetch_assoc()) {
  $rr->addRow($row);
}
$rr->sendResult();

// echo "Test6";