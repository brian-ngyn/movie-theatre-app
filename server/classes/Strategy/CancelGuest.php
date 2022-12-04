<?php

require_once("CancelStrategy.php"); // Import the interface

/**
 * Concrete strategy class that uses the Strategy interface to implement the cancellation of an order for a guest user
 */
class CancelGuest implements CancelStrategy
{
    /**
     * Cancels the order for a guest user
     * @param $order - The order to be cancelled
     * @return void
     */
    public function cancel($order)
    {
        $displayInformation = $order['displayInformation']; // Get the display information
        $user_email = $displayInformation[0]['user_email']; // Get the user's email

        foreach ($displayInformation as $seat) {
            $sql = "UPDATE Seat SET seat_status = '0' WHERE seat_id = '$seat[seat_id]'"; // Set the seat status to 0 (available)
            $result = DBConnection::getInstance()->query($sql); // Execute the query
        }

        $refund_amount = count($displayInformation) * 10 * 0.85; // Calculate the refund amount, 15% admin fee so 85% of the total amount is refunded
        $payment_id = $displayInformation[0]['payment_id']; // Get the payment id

        $sql = "UPDATE Payment SET refunded = $refund_amount WHERE payment_id = '$payment_id'"; // Update the payment table to reflect the refund
        $result = DBConnection::getInstance()->query($sql); // Execute the query
        echo json_encode((object) ["body" => (object) ["refundAmount" => $refund_amount], "status" => 200]); // Return the refund amount

        $seats_numbers_formatted = implode(", ", array_column($displayInformation, 'seat_number')); // Get the seat numbers in a comma separated list
        $refund_percentage = "85%"; // Set the refund percentage

        require_once("../../templates/cancelMail.php"); // Import the email template
        $headers = "MIME-Version: 1.0" . "\r\n"; // Set the headers
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; // Set the headers
        $headers .= "From: Movie Theater <ideen.bcc@gmail.com>" . "\r\n"; // Set the headers

        // Send the email
        mail(
            $user_email,
            "Movie Theater - Your Refund",
            $txt,
            $headers
        );

        // Send Email
    }
}