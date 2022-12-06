<?php

require_once('../endpointIncludes.php');
assertRequestMethod('POST');

$_POST = json_decode(file_get_contents("php://input"),true);

// print_r($_POST);

// read post data
// insert into Movies table 

$sql = "INSERT INTO Movies (movie_title, movie_duration, movie_image, theatre_id, public_date)  
  VALUES ('".$_POST['movie_title']."', '".$_POST['movie_duration']."', '".$_POST['movie_image']."', '".$_POST['theatre_id']."', '".$_POST['movie_presale']."')";
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
// $rr = new RESTful($result); // return the result to user in REST format

$inserted_movie_id = DBConnection::getInstance()->insert_id; // get the last insert id which is the payment ID

$sql = "INSERT INTO Showtimes (show_date, show_start, show_end, movie_id) 
  VALUES ('".date('Y-m-d', strtotime($_POST['movie_presale'] . ' + 2 days'))."', '12:00:00', '14:00:00', '".$inserted_movie_id."')";
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement

$inserted_showtime_id = DBConnection::getInstance()->insert_id; // get the last insert id which is the payment ID


$sql = "INSERT INTO Seat (seat_number, showtime_id, seat_status, seat_cost) 
  VALUES 
    ('A1', '$inserted_showtime_id', '0', '10'),
    ('A2', '$inserted_showtime_id', '0', '10'),
    ('A3', '$inserted_showtime_id', '0', '10'),
    ('A4', '$inserted_showtime_id', '0', '10'),
    ('A5', '$inserted_showtime_id', '0', '10'),
    ('A6', '$inserted_showtime_id', '0', '10'),
    ('A7', '$inserted_showtime_id', '0', '10'),
    ('A8', '$inserted_showtime_id', '0', '10'),
    ('A9', '$inserted_showtime_id', '0', '10'),
    ('A10', '$inserted_showtime_id', '0', '10'),
    ('B1', '$inserted_showtime_id', '0', '10'),
    ('B2', '$inserted_showtime_id', '0', '10'),
    ('B3', '$inserted_showtime_id', '0', '10'),
    ('B4', '$inserted_showtime_id', '0', '10'),
    ('B5', '$inserted_showtime_id', '0', '10'),
    ('B6', '$inserted_showtime_id', '0', '10'),
    ('B7', '$inserted_showtime_id', '0', '10'),
    ('B8', '$inserted_showtime_id', '0', '10'),
    ('B9', '$inserted_showtime_id', '0', '10'),
    ('B10', '$inserted_showtime_id', '0', '10')";
    
$result = DBConnection::getInstance()->query($sql); // execute the SQL statement
$rr = new RESTful($result); // return the result to user in REST format
