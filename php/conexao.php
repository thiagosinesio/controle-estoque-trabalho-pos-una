<?php
error_reporting(1);
header('Access-Control-Allow-Origin: *');  
$link = mysql_connect('ninjadevspace.com', 'ninjadev_estoque', '3st0qu3una');
$bd   = mysql_select_db('ninjadev_estoque_service');
mysql_set_charset('utf8', $link);