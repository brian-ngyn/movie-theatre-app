<?php

// Connect to SQL
class DBConnection {
  public static $conn;
  private static $DB_HOST = "35.183.16.214";
  private static $DB_USER = "480Final";
  private static $DB_PASS = "480Final";
  private static $DB_NAME = "480Project";
  
  private static function dbconnect() {
    $conn = new mysqli(DBConnection::$DB_HOST, DBConnection::$DB_USER, DBConnection::$DB_PASS)
      or die ("<br/>Could not connect to MySQL server");
    
    mysqli_select_db($conn, DBConnection::$DB_NAME)
      or die ("<br/>Could not choose the database");
      
    DBConnection::$conn = $conn;
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
