<?php

$output = shell_exec('sudo /home/ubuntu/pull.sh');
echo $output;

include('../globalIncludes.php');

echo "Test2";