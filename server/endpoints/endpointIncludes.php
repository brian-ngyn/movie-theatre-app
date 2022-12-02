<?php



require_once($_SERVER['DOCUMENT_ROOT'].'/globalIncludes.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/classes/RESTful.php');

function assertRequestMethod($method) {
    if ($_SERVER['REQUEST_METHOD'] == $method) {
        return true;
    } else {
        die("{ \"error\": \"Invalid request method. Expected $method for $_SERVER[REQUEST_URI];  \" }");
    }
}