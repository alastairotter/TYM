<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$results = array();
$munis = array();



$sql = "SELECT mayors.name, mayors.id, mayors.municipality from mayors INNER JOIN promises ON promises.mayor = mayors.id group by mayors.name";
    $query = mysqli_query($db, $sql);
    
    while($row = mysqli_fetch_assoc($query)) {
        $row['type'] = "mayor";

        
        $muni = $row['municipality'];
        unset($row['municipality']);
        array_push($results,$row);
        array_push($munis, $muni);
        
        

    }
$munis = array_unique($munis);
//foreach($munis as $muni) { 
    
    $sql = "select * from municipalities where id in (3,8) group by id";
    $query = mysqli_query($db, $sql);
    
    while($row = mysqli_fetch_assoc($query)) {
        $row['type'] = "municipality";
        $row["name"] = $row['municipality'];
        
        
        unset($row['municipality']);
        unset($row['code']);
        unset($row['province']);
        array_push($results, $row);
        
    }

//}

//$sql = "SELECT municipalities.municipality, municipalities.id from municipalities INNER JOIN promises ON promises.municipality = municipalities.id group by municipalities.municipality";
//    $query = mysqli_query($db, $sql);
//    
//    while($row = mysqli_fetch_assoc($query)) {
//        $row['type'] = "municipality";
//
//        array_push($results,$row);
//
//    }

//var_dump($results);
//
//for each($results as $result) { 
//    var_dump($result);
//}

echo json_encode($results);


?>