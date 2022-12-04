<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

$sql = "SELECT * FROM Showtimes WHERE movie_id='$_GET[movie_id]'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);