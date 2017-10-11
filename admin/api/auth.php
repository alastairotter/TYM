<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$un = $_GET['un'];
//$pw = md5($_GET['pw']);
$pw = $_GET['pw'];

//echo $un;

$sql = "Select * from users where username = '$un' and password = '$pw'";

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