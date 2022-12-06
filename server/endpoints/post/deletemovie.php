<?php

require_once('../endpointIncludes.php');
assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"),true);

$sql = "DELETE FROM Movies WHERE movie_id = '$_GET[movie_id]'";
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format

// read post data
// get 