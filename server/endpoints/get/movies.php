<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');

/** 
 * Endpoint to get all movies from a certain theatre id
*/

$sql = "SELECT * FROM Movies WHERE theatre_id='$_GET[theatre_id]'"; // Prepare the SQL statement
$result = DBConnection::getInstance()->query($sql); // execute the statement 
$rr = new RESTful($result); // return the result to user in REST format