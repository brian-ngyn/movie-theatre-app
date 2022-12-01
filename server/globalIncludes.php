<?php

exec('cd /home/ubuntu ./pull.sh ' . PLUGIN_DIR . '/.htaccess ' . ABSPATH . '/.htaccess 2>&1',$output);
var_dump($output);