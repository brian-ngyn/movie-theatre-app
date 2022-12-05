<?php

require_once('../endpointIncludes.php');
assertRequestMethod('GET');


/** 
 * Endpoint to cancel ticket, returns payment information and seat information for the given email and payment id.
*/

// prepare the SQL statement 
$sql = "SELECT * FROM Payment INNER JOIN SeatPaymentRole ON Payment.payment_id = SeatPaymentRole.payment_id INNER JOIN Seat ON Seat.seat_id = SeatPaymentRole.seat_id WHERE user_email='$_GET[user_email]' AND Payment.payment_id='$_GET[payment_id]'";
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format