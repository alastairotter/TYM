<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$id = $_GET['id'];
$section = $_GET['section'];



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

if($id && $section) { 
    
if($section == "municipality") { 
        
        $sql = "Select mayor from promises where municipality = '$id' limit 0,1" ;
        $query = mysqli_query($db, $sql);
        $row = mysqli_fetch_assoc($query);
        $id = $row['mayor'];
    
                               }
    
//if($section == "mayor") { $sql = "Select * from promises where mayor = '$id'"; }
//elseif($section == "municipality") { $sql = "Select * from promises where municipality = '$id'"; }
//    
    $sql = "Select * from promises where mayor = '$id'"; 

    $total_promises = 0; 
    $tracked_promises = 0; 
    $untracked_promises = 0; 
    
//$sql = "Select * from promises";
    $query = mysqli_query($db, $sql);
    
    
    
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
        
        $total_promises++;
        // get mayor name
        $q = "select * from mayors where id = " . $row['mayor'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $muni = $q["municipality"];
        $row["mayor_name"] = $q["name"];
        $row["mayor_photo"] = $q["photo"];
        $row["party_id"] = $q["party"];
        
        if($row['tracked'] == "Yes") { $tracked_promises++; }
        else { $untracked_promises++; }
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
        $row["municipality_id"] = $muni;
        
        
        // get total promises by mayor
//        $q = "select * from promises where mayor = '$id'";
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['total_promises'] = mysqli_num_rows($q);
//        // get tracked promises by mayor
//        $q = "select * from promises where mayor = " . $row["mayor"] . " and tracked = 'Yes'";
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['tracked_promises'] = mysqli_num_rows($q);
//        // get untracked promises by mayor
//        $q = "select * from promises where mayor = " . $row["mayor"] . " and tracked = 'No'";
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['untracked_promises'] = mysqli_num_rows($q);
        $row = array_map('utf8_encode', $row);
        
        
        array_push($results,$row);
    }
    

$results['stats']['total_promises'] = $total_promises; 
$results['stats']['tracked_promises'] = $tracked_promises; 
$results['stats']['untracked_promises'] = $untracked_promises; 
$results['stats']['mayor_id'] = $id;
    
echo json_encode($results);
    
}
    

?>