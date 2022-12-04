<?php

require_once("./CancelStrategy.php");
class CancelRegisteredUser implements CancelStrategy {
    public function cancel($order) {
        // cancel based on RegisteredUser table
    }
}