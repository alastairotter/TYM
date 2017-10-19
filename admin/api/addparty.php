<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$name = $_GET["name"]; 
$name = addslashes($name);
$abbreviation = $_GET["abbreviation"]; 
$logo = $_GET["logo"];


$sql = "INSERT INTO parties (name, abbreviation, logo) VALUES ('$name', '$abbreviation', '$logo')";

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