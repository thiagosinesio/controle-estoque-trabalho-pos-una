<?php
$link = mysql_connect('localhost', 'root', 'root');
$bd   = mysql_select_db('agenda');
mysql_set_charset('utf8', $link);