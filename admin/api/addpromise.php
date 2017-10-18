<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$mayor = $_GET["mayor"]; 
$promise = $_GET['promise'];
$promise = addslashes($promise);
$tracked = $_GET["tracked"];

$source = $_GET["source"];
$promise_date = $_GET["promiseDate"];
$due_date = $_GET["dueDate"];


$sql = "INSERT INTO promises (mayor, promise, tracked) VALUES ('$mayor', '$promise', '$tracked')";

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