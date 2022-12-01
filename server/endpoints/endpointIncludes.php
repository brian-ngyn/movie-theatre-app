<?php



include_once('../globalIncludes.php');

function assertRequestMethod($method) {
    if ($_SERVER['REQUEST_METHOD'] == $method) {
        return true;
    } else {
        die("{ \"error\": \"Invalid request method. Expected $method\" }");
    }
}