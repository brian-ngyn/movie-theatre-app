<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

/** 
 * Endpoint to get all showtimes corresponding to a given movie id.
 */

$sql = "SELECT * FROM Showtimes WHERE movie_id='$_GET[movie_id]'"; // Prepare the sql statement
$result = DBConnection::getInstance()->query($sql); // execute the statement
$rr = new RESTful($result); // return the result to user in REST format