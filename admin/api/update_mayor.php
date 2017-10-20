<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");


$id = $_GET['id'];
$name = $_GET["name"]; 
$name = addslashes($name);
$party = $_GET["party"]; 
$municipality = $_GET["municipality"]; 
$photo = $_GET["photo"];

$sql = "UPDATE mayors set name = '$name', party = '$party', municipality = '$municipality', photo = '$photo' where id = '$id'";

    if($query = mysqli_query($db, $sql)) { 
        $result = "success";
    }
    else { 
        $result = "error";
    }
        
       
 



// $results = array();
//
//    while($row = mysqli_fetch_assoc($query)) {
//
//           $results[] = $row; 
//
//    }
    echo json_encode($result);
?>