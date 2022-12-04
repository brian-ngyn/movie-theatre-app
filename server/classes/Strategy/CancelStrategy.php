<?php


/**
 * Strategy interface that defines the cancellation behaviour
 */
interface CancelStrategy {
    public function cancel($order);
}