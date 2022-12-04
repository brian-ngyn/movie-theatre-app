<?php

class CancelContext {
    private CancelStrategy $strategy;
    private $order;
    
    public function __construct($data) {
        $this->strategy = new CancelGuest();
        $this->order = $data;
    }
    
    public function performCancel() {
        $this->strategy->cancel($this->order);
    }

    public function setStrategy(CancelStrategy $strategy) {
        $this->strategy = $strategy;
    }
}