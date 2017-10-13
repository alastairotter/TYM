<?php

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');
mysqli_set_charset('utf8');

include("config.php");

//$section = $_GET["section"];
//echo $section;


//var_dump($_GET);
echo "Promises";

$sql = "Select id, mayor, promise from promises";

    $query = mysqli_query($db, $sql);



 $results = array();

//mysqli->query("SET NAMES 'utf8'");

    while($row = mysqli_fetch_assoc($query)) {
        
//        $row['promise'] = addslashes($row['promise']);

//        if($section != "promises") {    
//        //party details
//        $q = "select * from parties where id = " . $row['party'];  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['party_name'] = $q['name'];
//        $row['party_abbr'] = $q['abbreviation'];
//        
//        //municipal details
//        $q = "select * from municipalities where id = " . $row['municipality'];  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['municipality_name'] = $q['municipality'];
//        $row['municipality_province'] = $q['province'];
//        
//        //mayor details
//        $q = "select * from mayors where id = " . $row['mayor'];  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['mayor_name'] = $q['name'];
//        }
        
        
//        var_dump($row);
        
        $row = array_map('utf8_encode', $row);
        array_push($results,$row);
        
//        $results[] = $row;

    }
//    $results = json_encode($results);
$json = json_encode($results);
    echo $json;
?>