<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

/** 
 * Endpoint to get all showtimes corresponding to a given showtime id (used when cancelling tickets).
*/

$sql = "SELECT * FROM Showtimes WHERE showtime_id='$_GET[showtime_id]'"; // Prepare the sql statement
$result = DBConnection::getInstance()->query($sql); // execute the statement
$rr = new RESTful($result); // return the result to user in REST format