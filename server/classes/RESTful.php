<?php


/**
 * Requires for production
 */
require_once($_SERVER['DOCUMENT_ROOT'].'/server/globalIncludes.php');

/**
 * Requires for development
 */
// require_once($_SERVER['DOCUMENT_ROOT'].'/globalIncludes.php');


class RESTful {
    public $returnObj = [];

    public function __construct($result){
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
    
    public function addRow($row){
        array_push($this->returnObj, $row);
    }

    public function getLastInsert(){
        return DBConnection::getInstance()->insert_id;
    }

    public function error($row){
        echo json_encode((object) ["error"=> $row, "status"=> 500]);
    }

    public function sendResult(){
        echo json_encode((object) ["body"=> $this->returnObj, "status"=> 200]);
    }
}