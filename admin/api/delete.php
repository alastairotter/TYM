<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");

$section = $_GET["section"];
$id = $_GET["id"];
//echo $section;



//var_dump($_GET);


$sql = "delete from `$section` where `id` = '$id'";

    if($query = mysqli_query($db, $sql)) { 
        $results = "success";
    }
    else { 
        $results = "error";
    }



 
    echo json_encode($results);
?>