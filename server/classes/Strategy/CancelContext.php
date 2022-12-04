<?php

/**
 * This class is used in conjunction with the Strategy pattern to allow for the implementation of different cancel behaviours for different categories of clients (ordinary vs registered users)
 */
class CancelContext {
    private CancelStrategy $strategy; // The strategy to be used
    private $order; // The order to be cancelled

    /**
     * Constructor for the class that sets the strategy to be used
     * @param $data - The order to be cancelled
     */
    public function __construct($data) {
        $this->strategy = new CancelGuest(); // Default strategy, can be changed later
        $this->order = $data; // Set the order to be cancelled
    }

    /**
     * Performs the cancellation of the order
     * @return void
     */
    public function performCancel() {
        $this->strategy->cancel($this->order);
    }

    /**
     * Sets the strategy to be used
     * @param CancelStrategy $strategy - The strategy to be used
     * @return void
     */
    public function setStrategy(CancelStrategy $strategy) {
        $this->strategy = $strategy;
    }
}