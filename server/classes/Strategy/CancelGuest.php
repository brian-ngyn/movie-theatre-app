<?php

require_once("./CancelStrategy.php");
class CancelGuest implements CancelStrategy {
    public function cancel($order) {
        // cancel by not using registeredusers table
    }
}