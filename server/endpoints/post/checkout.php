<?php

include_once('../endpointIncludes.php');

$_POST = json_decode(file_get_contents("php://input"),true);

print_r($_POST);

// mail(
//     "me@ideen.ca",
//     "Checkout",
//     "Checkout",
//     "From: ibanijamali@gmail.com"
// );



