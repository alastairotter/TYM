<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");


$section = $_GET['section'];
$start = $_GET['start'];
$count = $_GET['count'];




//$list = array("parties", "municipalities");
$results = array();


switch ($section) {
    case "parties":
        
        $sql = "Select * from parties limit $start, $count";
            $query = mysqli_query($db, $sql);
            
            while($row = mysqli_fetch_assoc($query)) {
                $row = array_map('utf8_encode', $row);
                array_push($results,$row);
                }
        
            echo json_encode($results);
        
    break; 
        
    case "municipalities": 
        
        $sql = "Select * from municipalities limit $start, $count";
            $query = mysqli_query($db, $sql);
            $municipalities = array();
            while($row = mysqli_fetch_assoc($query)) { 
                $row = array_map('utf8_encode', $row);
                array_push($results,$row);
            }
        
            echo json_encode($results);
        
    break;
        
    case "categories": 
        
        $sql = "Select * from categories limit $start, $count";
            $query = mysqli_query($db, $sql);
            $categories = array();
            while($row = mysqli_fetch_assoc($query)) {
                $row = array_map('utf8_encode', $row);
                array_push($results,$row);

            }
        
            echo json_encode($results);
        
    break;


    case "mayors":
        
        $sql = "Select * from mayors limit $start, $count";
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
        
            echo json_encode($results);
        
    break;
        
        
    case "promises": 
        
        // DEFINE QUERY
        
//        if($_GET['mayor']) {
//            $mayor = $_GET['mayor'];
////            $mayor = "mayor = '$mayor'";
////            $sql = "Select * from promises where mayor = '$mayor' limit $start, $count";
//        }
        
        // create query
        $clauses = 0;
        $w; 
        if($_GET['mayor']) {
            $mayor = $_GET['mayor'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE mayor = '$mayor' "; $clauses++;   }
            
            else { 
                $w = $w . " AND mayor = '$mayor' "; $clauses++;   }
        }
        
        if($_GET['municipality']) {
            $municipality = $_GET['municipality'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE municipality = '$municipality' "; $clauses++;   }
            
            else { 
                $w = $w . " AND municipality = '$municipality' "; $clauses++;   }
        }
        
        if($_GET['category']) {
            $category = $_GET['category'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE category = '$category' "; $clauses++;   }
            
            else { 
                $w = $w . " AND category = '$category' "; $clauses++;   }
        }
        
        if($_GET['status']) {
            $status = $_GET['status'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE status = '$status' "; $clauses++;   }
            
            else { 
                $w = $w . " AND status = '$status' "; $clauses++;   }
        }
        
        
        if($_GET['tracked']) {
            $tracked = $_GET['tracked'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE tracked = '$tracked' "; $clauses++;   }
            
            else { 
                $w = $w . " AND tracked = '$tracked' "; $clauses++;   }
        }
        

echo $w; 
        
        $sql = "Select * from promises " . $w . " limit $start, $count";
        
        echo $sql;
        
        
        
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
                // get category name
                $q = "select * from categories where id = " . $row["category"];  
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['category_name'] = $q["category"];
                $row = array_map('utf8_encode', $row);
                array_push($results,$row);
                
                
            }
        
            echo json_encode($results);
        
        break;
        
        
}
    

//$results['parties'] = $parties;
//$results['municipalities'] = $municipalities;
//$results['categories'] = $categories;
//$results['mayors'] = $mayors;
//$results['promises'] = $promises; 

//echo json_encode($results);
    

?>