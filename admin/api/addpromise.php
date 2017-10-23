<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$mayor = $_GET["mayor"]; 
$promise = $_GET['promise'];
$promise = addslashes($promise);
$tracked = $_GET["tracked"];
$status = $_GET["status"];

$source = addslashes($_GET["source"]);
$promise_date = $_GET["date"];

$due_month = $_GET["monthDue"];
$due_text = $_GET["textDue"];
$municipality = $_GET["municipality"];
$category = $_GET["category"];

if($_GET["dateDue"]) { $due_date = $_GET["dateDue"]; }
elseif($_GET["monthDue"]) { $due_date = $_GET["monthDue"] . "-01"; }
//elseif($_GET["textDue"]) { $due_date = $_GET["textDue"]; }
else { $due_date = ""; }


$sql = "INSERT INTO promises (mayor, promise, date_made, due_date, tracked, source, status, municipality, category) VALUES ('$mayor', '$promise', '$promise_date', '$due_date', '$tracked', '$source', '$status', '$municipality', '$category')";

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