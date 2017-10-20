<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$name = $_GET["name"]; 
$name = addslashes($name);
$party = $_GET["party"]; 
$municipality = $_GET["municipality"]; 
$photo = $_GET["photo"];

$sql = "INSERT INTO mayors (name, party, municipality, photo) VALUES ('$name', '$party', '$municipality', '$photo')";

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