<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$section = $_GET["section"];
//echo $section;


//var_dump($_GET);


$sql = "Select * from $section";

    $query = mysqli_query($db, $sql);



 $results = array();

    while($row = mysqli_fetch_assoc($query)) {

           $results[] = $row; 

    }
    echo json_encode($results);
?>