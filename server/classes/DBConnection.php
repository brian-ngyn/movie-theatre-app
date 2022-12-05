<?php

// Connect to SQL
class DBConnection { // Singleton class to connect to database
  public static $conn;
  private static $DB_HOST = "35.183.16.214";
  private static $DB_USER = "480Final";
  private static $DB_PASS = "480Final";
  private static $DB_NAME = "480Project";
  
  private static function dbconnect() {
    $conn = new mysqli(DBConnection::$DB_HOST, DBConnection::$DB_USER, DBConnection::$DB_PASS) // connect to database server
      or die ("<br/>Could not connect to MySQL server");
    
    mysqli_select_db($conn, DBConnection::$DB_NAME) // select database
      or die ("<br/>Could not choose the database");
      
    DBConnection::$conn = $conn; // set the connection
  }

  private function __construct() { // default constructor
    $this->dbconnect(); 
  }

  public static function getInstance() { // get the instance
    if(!self::$conn) { // if the instance is already created, return it else make a new one (Singleton)
        $conn = new DBConnection(); 
    }
    return self::$conn;
  }
}

?>
