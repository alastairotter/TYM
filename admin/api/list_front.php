<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

//$section = $_GET["section"];
//echo $section;


//var_dump($_GET);


$sql = "Select * from mayors";

    $query = mysqli_query($db, $sql);



 $results = array();

    while($row = mysqli_fetch_assoc($query)) {

           
        //party details
        $q = "select * from parties where id = " . $row['party'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['party_name'] = $q['name'];
        $row['party_abbr'] = $q['abbreviation'];
        
        //municipal details
        $q = "select * from municipalities where id = " . $row['municipality'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['municipality_name'] = $q['municipality'];
        $row['municipality_province'] = $q['province'];
        
        //promise details
        
        $q ="select * from promises where mayor = " . $row["id"] . " and tracked = 'yes'";
        $q = mysqli_query($db, $q);
        $q = mysqli_num_rows($q);
        $row['tracked_promises'] = $q;
        
        $q ="select * from promises where mayor = " . $row["id"] . " and tracked = 'no'";
        $q = mysqli_query($db, $q);
        $q = mysqli_num_rows($q);
        $row['untracked_promises'] = $q;
        
//        $q = "select * from mayors where id = " . $row['mayor'];  
//        $q = mysqli_query($db, $q);
//        $q = mysqli_fetch_assoc($q);
//        $row['mayor_name'] = $q['name'];
//        
        
        
        
        $results[] = $row;

    }
    echo json_encode($results);
?>