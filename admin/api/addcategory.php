<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$category = $_GET["category"]; 
$category = addslashes($category);


$sql = "INSERT INTO categories (category) VALUES ('$category')";

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