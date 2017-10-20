<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$section = $_GET["section"];
$id = $_GET["id"];



$list = array("parties", "municipalities");
$results = array();

// parties
if($section == "parties") {
$sql = "Select * from parties where id = '$id'";
    $query = mysqli_query($db, $sql);
    $parties = array();
    while($row = mysqli_fetch_assoc($query)) {
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);
    }
}


// municipalities
if($section == "municipalities") { 
$sql = "Select * from municipalities where id = '$id'";
    $query = mysqli_query($db, $sql);
    $municipalities = array();
    while($row = mysqli_fetch_assoc($query)) { 
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);
    }
}


// categories
if($section == "categories") {
$sql = "Select * from categories where id = '$id'";
    $query = mysqli_query($db, $sql);
    $categories = array();
    while($row = mysqli_fetch_assoc($query)) {
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);

    }
}


// mayors
if($section == "mayors") {
$sql = "Select * from mayors where id = '$id'";
    $query = mysqli_query($db, $sql);
    $mayors = array();
    while($row = mysqli_fetch_assoc($query)) {
        $row = array_map('utf8_encode', $row);
        //get municipality
        $q = "select * from municipalities where id = " . $row['municipality'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["municipality_name"] = $q["municipality"];
        //get party
        $q = "select * from parties where id = " . $row['party'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["party_name"] = $q["name"];
        //get promise stats
        $q = "select * from promises where mayor = " . $row['id'];  
        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
        $q = mysqli_num_rows($q);
        $row["promises"] = $q;
        array_push($results,$row);
    }
}

//promises
if($section == "promises") { 
$sql = "Select * from promises where id = '$id'";
    $query = mysqli_query($db, $sql);
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
        // get mayor name
        $q = "select * from mayors where id = " . $row['mayor'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $muni = $q["municipality"];
        $row["mayor_name"] = $q["name"];
        // get mayor municipality
        $q = "select * from municipalities where id = '$muni'";  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["municipality_name"] = $q["municipality"];
        $row["municipality_id"] = $muni;
        //sort dates
        $row["date"] = $row["date_made"];
        $row["dateDue"] = $row["due_date"];
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);
    }
    
}
    

//$results['parties'] = $parties;
//$results['municipalities'] = $municipalities;
//$results['categories'] = $categories;
//$results['mayors'] = $mayors;
//$results = $promises; 

echo json_encode($results);
    

?>