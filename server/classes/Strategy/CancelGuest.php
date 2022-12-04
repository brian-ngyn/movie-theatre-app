<?php

require_once("CancelStrategy.php");

class CancelGuest implements CancelStrategy
{
    public function cancel($order)
    {
        $displayInformation = $order['displayInformation'];
        $user_email = $displayInformation[0]['user_email'];

        foreach ($displayInformation as $seat) {
            $sql = "UPDATE Seat SET seat_status = '0' WHERE seat_id = '$seat[seat_id]'";
            $result = DBConnection::getInstance()->query($sql);
        }

        $refund_amount = count($displayInformation) * 10 * 0.85;
        $payment_id = $displayInformation[0]['payment_id'];

        $sql = "UPDATE Payment SET refunded = $refund_amount WHERE payment_id = '$payment_id'";
        $result = DBConnection::getInstance()->query($sql);
        echo json_encode((object) ["body" => (object) ["refundAmount" => $refund_amount], "status" => 200]);

        $seats_numbers_formatted = implode(", ", array_column($displayInformation, 'seat_number'));
        $refund_percentage = "85%";

        require_once("../../templates/cancelMail.php");
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: Movie Theater <ideen.bcc@gmail.com>" . "\r\n";

        
        mail(
            $user_email,
            "Movie Theater - Your Refund",
            $txt,
            $headers
        );

        // Send Email
    }
}