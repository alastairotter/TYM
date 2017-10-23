<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$results = array();



//$sql = "Select * from promises";
//    $query = mysqli_query($db, $sql);
//    $promises = array();
//    while($row = mysqli_fetch_assoc($query)) {
//        // get mayor name
//        $q = "select * from mayors where id = " . $row['mayor'];  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $muni = $q["municipality"];
//        $row["mayor_name"] = $q["name"];
//        // get mayor municipality
//        $q = "select * from municipalities where id = '$muni'";  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row["municipality_name"] = $q["municipality"];
//        $row["municipality_id"] = $muni;
//        $row = array_map('utf8_encode', $row);
//        array_push($results,$row);
//    }



$sql = "Select * from promises";
    $query = mysqli_query($db, $sql);
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
        // get mayor name
        $q = "select * from mayors where id = " . $row['mayor'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $muni = $q["municipality"];
        $row["mayor_name"] = $q["name"];
        $row["party_id"] = $q["party"];
        // get party name
        // got party_id        
        $q = "select * from parties where id = " . $row['party_id'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["party_name"] = $q["name"];
        $row["party_abbr"] = $q["abbreviation"];
        $row["party_logo"] = $q["logo"];
        // get mayor municipality
        $q = "select * from municipalities where id = '$muni'";  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["municipality_name"] = $q["municipality"];
        // get category name
        $q = "select * from categories where id = " . $row['category'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["category_name"] = $q["category"];
//        $row["municipality_id"] = $muni;
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);
    }
    



echo json_encode($results);
    

    

?>