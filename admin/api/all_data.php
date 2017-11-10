<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");


$section = $_GET['section'];
$start = $_GET['start'];
$count = $_GET['count'];




//$list = array("parties", "municipalities");
$results = array();



// get cat details
// get mayors
        
        $mayors = array();
       
        $sql = "SELECT DISTINCT(mayor) from promises";
        
            $query = mysqli_query($db, $sql);
            while($row = mysqli_fetch_assoc($query)) {
              
                $q = "SELECT * from mayors where id = " . $row['mayor'];
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['mayor_name'] = $q['name'];
                
                
                $row = array_map('utf8_encode', $row);
                array_push($mayors,$row);
                
            }
        
        $results['mayors'] = $mayors;
        
        // get municiapalities
        
        $municipalities = array();
       
        $sql = "SELECT DISTINCT(municipality) from promises";
        
            $query = mysqli_query($db, $sql);
            while($row = mysqli_fetch_assoc($query)) {
              
                $q = "SELECT * from municipalities where id = " . $row['municipality'];
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['municipality_name'] = $q['municipality'];
                
                
                $row = array_map('utf8_encode', $row);
                array_push($municipalities,$row);
                
            }
        
        
        
        // get categories
        
        $categories = array();
       
        $sql = "SELECT DISTINCT(category) from promises";
        
            $query = mysqli_query($db, $sql);
            while($row = mysqli_fetch_assoc($query)) {
              
                $q = "SELECT * from categories where id = " . $row['category'];
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['category_name'] = $q['category'];
                
                
                $row = array_map('utf8_encode', $row);
                array_push($categories,$row);
                
            }
        
        
        // get statuses
        
        $statuses = array();
       $sid = 0;
        $sql = "SELECT DISTINCT(status) from promises";
        
            $query = mysqli_query($db, $sql);
            while($row = mysqli_fetch_assoc($query)) {
              $row['id'] = $sid; 
//                $q = "SELECT * from categories where id = " . $row['category'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['category_name'] = $q['category'];
                
                
                $row = array_map('utf8_encode', $row);
                array_push($statuses,$row);
                
                $sid++;
                
            }
        
        
        // get parties
        
        $parties = array();
       
        $sql = "SELECT DISTINCT(party) from promises";
        
            $query = mysqli_query($db, $sql);
            while($row = mysqli_fetch_assoc($query)) {
              
//                $q = "SELECT * from mayors where id = " . $row['mayor'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['party_id'] = $q['party'];
                
                $q = "SELECT * from parties where id = " .$row['party'];
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['party_name'] = $q['name'];
                $row['party_abbreviation'] = $q['abbreviation'];
                
                
                $row = array_map('utf8_encode', $row);
                array_push($parties,$row);
                
                $sid++;
                
            }


 $results['municipalities'] = $municipalities;
        
        $results['mayors'] = $mayors;
        
        $results['categories'] = $categories;
        
        $results['statuses'] = $statuses;
        
        $results['parties'] = $parties;
        





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
        

        
        // create query
        $clauses = 0;
        $w; 
        if($_GET['mayor']) {
            $mayor = $_GET['mayor'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.mayor = '$mayor' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.mayor = '$mayor' "; $clauses++;   }
        }
        
        if($_GET['municipality']) {
            $municipality = $_GET['municipality'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.municipality = '$municipality' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.municipality = '$municipality' "; $clauses++;   }
        }
        
        if($_GET['category']) {
            $category = $_GET['category'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.category = '$category' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.category = '$category' "; $clauses++;   }
        }
        
        if($_GET['status']) {
            $status = $_GET['status'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.status = '$status' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.status = '$status' "; $clauses++;   }
        }
        
        
        if($_GET['tracked']) {
            $tracked = $_GET['tracked'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.tracked = '$tracked' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.tracked = '$tracked' "; $clauses++;   }
        }
        
        if($_GET['party']) {
            $party = $_GET['party'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.party = '$party' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.party = '$party' "; $clauses++;   }
        }
        

//SELECT promises.*, mayors.name from promises LEFT JOIN mayors on promises.mayor = mayors.id WHERE promises.mayor = 25
        
        $sql = "Select promises.*, mayors.name from promises LEFT JOIN mayors on promises.mayor = mayors.id " . $w . " order by mayors.name limit $start, $count";
        
    
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
                // get party name
                $q = "select * from parties where id = " . $row["party"];  
                $q = mysqli_query($db, $q);
                $q = mysqli_fetch_assoc($q);
                $row['party_name'] = $q["name"];
                $row['party_abbr'] = $q['abbreviation'];
                $row = array_map('utf8_encode', $row);
                array_push($results,$row);
                
                
            }
        
        
        
//        // get mayors
//        
//        $mayors = array();
//       
//        $sql = "SELECT DISTINCT(mayor) from promises";
//        
//            $query = mysqli_query($db, $sql);
//            while($row = mysqli_fetch_assoc($query)) {
//              
//                $q = "SELECT * from mayors where id = " . $row['mayor'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['mayor_name'] = $q['name'];
//                
//                
//                $row = array_map('utf8_encode', $row);
//                array_push($mayors,$row);
//                
//            }
//        
//        $results['mayors'] = $mayors;
//        
//        // get municiapalities
//        
//        $municipalities = array();
//       
//        $sql = "SELECT DISTINCT(municipality) from promises";
//        
//            $query = mysqli_query($db, $sql);
//            while($row = mysqli_fetch_assoc($query)) {
//              
//                $q = "SELECT * from municipalities where id = " . $row['municipality'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['municipality_name'] = $q['municipality'];
//                
//                
//                $row = array_map('utf8_encode', $row);
//                array_push($municipalities,$row);
//                
//            }
//        
//        
//        
//        // get categories
//        
//        $categories = array();
//       
//        $sql = "SELECT DISTINCT(category) from promises";
//        
//            $query = mysqli_query($db, $sql);
//            while($row = mysqli_fetch_assoc($query)) {
//              
//                $q = "SELECT * from categories where id = " . $row['category'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['category_name'] = $q['category'];
//                
//                
//                $row = array_map('utf8_encode', $row);
//                array_push($categories,$row);
//                
//            }
//        
//        
//        // get statuses
//        
//        $statuses = array();
//       $sid = 0;
//        $sql = "SELECT DISTINCT(status) from promises";
//        
//            $query = mysqli_query($db, $sql);
//            while($row = mysqli_fetch_assoc($query)) {
//              $row['id'] = $sid; 
////                $q = "SELECT * from categories where id = " . $row['category'];
////                $q = mysqli_query($db, $q);
////                $q = mysqli_fetch_assoc($q);
////                $row['category_name'] = $q['category'];
//                
//                
//                $row = array_map('utf8_encode', $row);
//                array_push($statuses,$row);
//                
//                $sid++;
//                
//            }
//        
//        
//        // get parties
//        
//        $parties = array();
//       $sid = 0;
//        $sql = "SELECT DISTINCT(mayor) from promises";
//        
//            $query = mysqli_query($db, $sql);
//            while($row = mysqli_fetch_assoc($query)) {
//              
//                $q = "SELECT * from mayors where id = " . $row['mayor'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['party_id'] = $q['party'];
//                
//                $q = "SELECT * from parties where id = " .$row['party_id'];
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['party_name'] = $q['name'];
//                $row['party_abbreviation'] = $q['abbreviation'];
//                
//                
//                $row = array_map('utf8_encode', $row);
//                array_push($parties,$row);
//                
//                $sid++;
//                
//            }
        
        
        
//        $results['municipalities'] = $municipalities;
//        
//        $results['mayors'] = $mayors;
//        
//        $results['categories'] = $categories;
//        
//        $results['statuses'] = $statuses;
//        
//        $results['parties'] = $parties;
//        
        
        
        
        
        
        // finish up
        
        echo json_encode($results, JSON_NUMERIC_CHECK);
        
        break;
        
        
}
    

//$results['parties'] = $parties;
//$results['municipalities'] = $municipalities;
//$results['categories'] = $categories;
//$results['mayors'] = $mayors;
//$results['promises'] = $promises; 

//echo json_encode($results);
    

?>