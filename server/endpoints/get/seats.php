<?php

include_once('../endpointIncludes.php');
assertRequestMethod('GET');

$sql = "SELECT * FROM Seat WHERE showtime_id = '$_GET[showtime_id]'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);