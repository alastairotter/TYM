<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$sql = "Select * from users where username = 'alastairotter' and password = '" . md5("lb309x") . "'";

    $query = mysqli_query($db, $sql);

    $rc = mysqli_num_rows($query);
    
    $rc = json_encode($rc);
    echo $rc;




//    if($rc == 1) { 
//
//        $row = mysqli_fetch_assoc($query);
//
//            $un = $row['username'];
//            $pw = $row['password'];
//
//            
//
//    }

?>