<?php


interface CancelStrategy {
    public function cancel($order) {
        $order->cancel();
    }
}