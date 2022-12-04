<?php

require_once('../endpointIncludes.php');

assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO Payment (payment_amount, user_email, card_number, expiry_date, cvc) 
        VALUES ('$_POST[payment_amount]', '$_POST[user_email]', '$_POST[card_number]', '$_POST[expiry_date]', '$_POST[cvc]')";
$resultToSend = DBConnection::getInstance()->query($sql);

$payment_id = DBConnection::getInstance()->insert_id;

$actor = $_POST['isGuestCheckout'] + 1;
$seats_ids_formatted = implode(", ", $_POST['seats_ids']);
$seats_numbers_formatted = implode(", ", $_POST['seats_number']);

// if guest checkout then set seat_status to 2
// if registered user checkout then set seat_status to 1

foreach ($_POST['seats_ids'] as $seat) {
    $sql = "INSERT INTO SeatPaymentRole (payment_id, seat_id) VALUES ('$payment_id', '$seat')";
    $result = DBConnection::getInstance()->query($sql);
}


$sql = "UPDATE Seat SET seat_status = $actor WHERE seat_id IN ($seats_ids_formatted)";
$result = DBConnection::getInstance()->query($sql);

require_once('./checkoutMail.php');
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Movie Theater <ideen.bcc@gmail.com>" . "\r\n";

mail(
    "$_POST[user_email]",
    "Movie Theater - Your Tickets",
    $txt,
    $headers
);

echo json_encode((object) ["body"=> (object)["lastinsertId"=> $payment_id], "status"=> 200]);


