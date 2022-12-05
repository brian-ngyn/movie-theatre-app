<?php


require_once('../endpointIncludes.php');
assertRequestMethod('GET');

/** 
 * Endpoint to return all theatres.
 */

$sql = "SELECT * FROM Theatres"; // Prepare the SQL statement
$result = DBConnection::getInstance()->query($sql); // execute the statement
$rr = new RESTful($result); // return the result to user in REST format