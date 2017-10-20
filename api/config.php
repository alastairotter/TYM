<?php

//ini_set('display_startup_errors', 1);
//ini_set('display_errors', 1);
//error_reporting(-1);

define('DB_SERVER', 'localhost:3306');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', 'root');
   define('DB_DATABASE', 'tym');

// LIVE
//define('DB_SERVER', 'sql23.cpt3.host-h.net');
//   define('DB_USERNAME', 'tectobhjww_11');
//   define('DB_PASSWORD', 'tPg54hZ4Lu8');
//   define('DB_DATABASE', 'trackyourmayor');

//$db = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
//if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

$db = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    if (mysqli_connect_errno($db))
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
?>