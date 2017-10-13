<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$name = $_GET["name"]; 
$party = $_GET["party"]; 
$municipality = $_GET["municipality"]; 



//var_dump($_GET);

//if($party) { 
//    $sql = "Select * from parties where id = '$party'"; 
//    $query = mysqli_query($db, $sql);
//    $row = mysqli_fetch_assoc($query);
//    $party_name = $row['name'];
//}
//
//if($municipality) { 
//    $sql = "Select * from municipalities where id = '$municipality'"; 
//    $query = mysqli_query($db, $sql);
//    $row = mysqli_fetch_assoc($query);
//    $municipality_name = $row['municipality'];
//    echo $municipality_name;
//}


$sql = "INSERT INTO mayors (name, party, municipality) VALUES ('$name', '$party', '$municipality')";

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