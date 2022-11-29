<?php

$DB_HOST = "35.183.16.214";
$DB_USER = "480Project";
$DB_PASS = "480Project";
$DB_NAME = "480Project";

// Connect to SQL
class DBConnection {
    public $conn;
    
    private function dbconnect() {
        $conn = mysql_connect($DB_HOST, $DB_USER, $DB_PASS);
          or die ("<br/>Could not connect to MySQL server");
             
        mysql_select_db($DB_NAME,$conn)
          or die ("<br/>Could not choose the database");
         
        $this->conn = $conn;
      }
  }