<?php

/**
 * Requires for development
 */
require_once($_SERVER['DOCUMENT_ROOT'].'/server/globalIncludes.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/server/classes/RESTful.php');

/**
 * Requires for production
 */
// require_once($_SERVER['DOCUMENT_ROOT'].'/globalIncludes.php');
// require_once($_SERVER['DOCUMENT_ROOT'].'/classes/RESTful.php');


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

function assertRequestMethod($method) {
    if ($_SERVER['REQUEST_METHOD'] == $method) {
        return true;
    } else {
        die("{ \"error\": \"Invalid request method. Expected $method for $_SERVER[REQUEST_URI];  \" }");
    }
}