<?php

$DB_HOST = "35.183.16.214";
$DB_USER = "480Project";
$DB_PASS = "480Project";
$DB_NAME = "480Project";

// Connect to SQL
class DBConnection {
  public static $conn;
  
  private function dbconnect() {
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS)
      or die ("<br/>Could not connect to MySQL server");
    
    mysqli_select_db($conn, $DB_NAME)
      or die ("<br/>Could not choose the database");
      
    $this->conn = $conn;
  }

  private function __construct() {
    $this->dbconnect();
  }

  public static function getInstance() {
    if(!self::$conn) {
        $conn = new DBConnection();
    }
    return self::$conn;
  }
}

?>
