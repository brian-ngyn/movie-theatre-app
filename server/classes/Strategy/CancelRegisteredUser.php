<?php

require_once("CancelStrategy.php");

/**
 * Concrete strategy class that uses the Strategy interface to implement the cancellation of an order for a registered user.
 */
class CancelRegisteredUser implements CancelStrategy
{
    /**
     * Cancels the order
     * @param $order - The order to be cancelled
     * @return void
     * @throws Exception - If the order is not found
     */
    public function cancel($order)
    {
        $displayInformation = $order['displayInformation']; // Get the display information
        $payment_id = $displayInformation[0]['payment_id']; // Get the payment id
        $user_email = $displayInformation[0]['user_email']; // Get the user email

        // Check if registered user still has a valid subscription
        $sql = "SELECT * FROM RegisteredUsers INNER JOIN Payment ON Payment.user_email = RegisteredUsers.email WHERE Payment.payment_id = '$payment_id'";
        $result = DBConnection::getInstance()->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $registration_expiry = (new DateTime($row['membership_last_payment']))->add(new DateInterval('P365D'));
            $now = new DateTime();
            if ($now >= $registration_expiry) {
                // User has no valid subscription
                echo json_encode((object) ["body" => (object) ["error" => "ERR_EXPIRED_USER"], "status" => 200]);
                die();
            }
        }

        // User has a valid subscription
        foreach ($displayInformation as $seat) {
            $sql = "UPDATE Seat SET seat_status = '0' WHERE seat_id = '$seat[seat_id]'";
            $result = DBConnection::getInstance()->query($sql);
        }

        // Refund full amount
        $refund_amount = count($displayInformation) * 10;

        $sql = "UPDATE Payment SET refunded = $refund_amount WHERE payment_id = '$payment_id'"; // Update the payment table to reflect the refund
        $result = DBConnection::getInstance()->query($sql); // Execute the query

        $seats_numbers_formatted = implode(", ", array_column($displayInformation, 'seat_number')); // Get the seat numbers in a comma separated list
        $refund_percentage = "100%";

        echo json_encode((object) ["body" => (object) ["refundAmount" => $refund_amount], "status" => 200]);
        
        require_once("../../templates/cancelMail.php");

        // Mail
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: Movie Theater <ideen.bcc@gmail.com>" . "\r\n";

        mail(
            $user_email,
            "Movie Theater - Your Refund",
            $txt,
            $headers
        );
    }
}