<?php

include_once('../endpointIncludes.php');
assertRequestMethod('GET');

$sql = "SELECT seat_id AS id, seat_number AS seat, seats_status FROM Showtimes WHERE movie_id='$_GET[movie_id]'";
$result = DBConnection::getInstance()->query($sql);
$rr = new RESTful($result);