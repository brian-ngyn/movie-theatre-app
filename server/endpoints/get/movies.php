<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

$sql = "SELECT * FROM Movies WHERE theatre_id='$_GET[theatre_id]'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);