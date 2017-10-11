<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$un = $_GET['un'];
$pw_orig = $_GET['pw'];
$pw = md5($_GET['pw']);
//$pw = $_GET['pw'];

//echo $un;

$sql = "Select * from users where username = '$un' and password = '$pw'";

    $query = mysqli_query($db, $sql);

    $rc[0] = mysqli_num_rows($query);
    $rc[1] = md5($pw_orig);    
    




    if($rc[0] == 1) { 

        $row = mysqli_fetch_assoc($query);

            $un = $row['username'];
            $pw = $row['password'];
            $first = $row['first_name'];
            $surname = $row['last_name'];

         $rc[2] = $row;   

    }




$rc = json_encode($rc);
    echo $rc;

?>