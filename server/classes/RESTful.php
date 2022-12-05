<?php


/**
 * Requires for development
 */
require_once($_SERVER['DOCUMENT_ROOT'].'/server/globalIncludes.php');

/**
 * Requires for production
 */
// require_once($_SERVER['DOCUMENT_ROOT'].'/globalIncludes.php');


class RESTful { // class to format API responses in REST format.
    public $returnObj = [];

    public function __construct($result){ // constructor
        if (DBConnection::getInstance()->error) {
            $this->error(DBConnection::getInstance()->error);
        } elseif($result !== true) {
            while ($row = $result->fetch_assoc()) {
                $this->addRow($row);
            }
            $this->sendResult();
        } elseif($result == true){
            echo json_encode((object) ["body"=> (object)["lastinsertId"=> $this->getLastInsert()], "status"=> 200]);
        }
    }
    
    public function addRow($row){ // helper function
        array_push($this->returnObj, $row);
    }

    public function getLastInsert(){ // helper function
        return DBConnection::getInstance()->insert_id;
    }

    public function error($row){ // helper function
        echo json_encode((object) ["error"=> $row, "status"=> 500]);
    }

    public function sendResult(){ // helper function
        echo json_encode((object) ["body"=> $this->returnObj, "status"=> 200]);
    }
}