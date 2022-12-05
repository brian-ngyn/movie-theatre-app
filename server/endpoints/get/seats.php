<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

/** 
 * Endpoint to get all seat numbers and seat ids for a given showtime id.
*/

$sql = "SELECT seat_id AS id, seat_number AS seat, seat_status FROM Seat WHERE showtime_id = '$_GET[showtime_id]'"; // prepare the SQL statement
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format