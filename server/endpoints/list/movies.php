<?php

include_once('../endpointIncludes.php');
assertRequestMethod('GET');

$sql = "SELECT * FROM Movies";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);