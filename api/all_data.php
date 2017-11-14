<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");


$list = array("parties", "municipalities");
$results = array();



$start = $_GET['start'];
$count = $_GET['count'];

// parties

$sql = "Select * from parties";
    $query = mysqli_query($db, $sql);
    $parties = array();
    while($row = mysqli_fetch_assoc($query)) {
        $row = array_map('utf8_encode', $row);
        array_push($parties,$row);
    }


// municipalities

$sql = "Select * from municipalities";
    $query = mysqli_query($db, $sql);
    $municipalities = array();
    while($row = mysqli_fetch_assoc($query)) { 
        $row = array_map('utf8_encode', $row);
        array_push($municipalities,$row);
    }


// categories

$sql = "Select * from categories";
    $query = mysqli_query($db, $sql);
    $categories = array();
    while($row = mysqli_fetch_assoc($query)) {
        $row = array_map('utf8_encode', $row);
        array_push($categories,$row);

    }


// mayors

$sql = "Select * from mayors";
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
        array_push($mayors,$row);
    }




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
        
        if($_GET['startdate']) {
            $startdate = $_GET['startdate'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.due_date > '$startdate' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.due_date > '$startdate' "; $clauses++;   }
        }
        
        if($_GET['enddate']) {
            $enddate = $_GET['enddate'];
            
            if($clauses == 0) { 
                $w = $w .  "WHERE promises.due_date < '$enddate' "; $clauses++;   }
            
            else { 
                $w = $w . " AND promises.due_date < '$enddate' "; $clauses++;   }
        }
        

//SELECT promises.*, mayors.name from promises LEFT JOIN mayors on promises.mayor = mayors.id WHERE promises.mayor = 25
        
       if($_GET['startdate']) { 
        $sql = "Select promises.*, mayors.name from promises LEFT JOIN mayors on promises.mayor = mayors.id " . $w . " order by promises.due_date desc limit $start, $count";
       }
        
        else { 
            $sql = "Select promises.*, mayors.name from promises LEFT JOIN mayors on promises.mayor = mayors.id " . $w . " order by mayors.name limit $start, $count";
        }


//promises
//$sql = "Select * from promises";
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
        $row = array_map('utf8_encode', $row);
        //get party
        $q = "select * from parties where id = " . $row['party'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['party_name'] = $q['name'];
        $row['party_abbreviation'] = $q['abbreviation'];
        //get party
        $q = "select * from categories where id = " . $row['category'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['category_name'] = $q['category'];
        // get WP links
        $q = "select * from wp_postmeta where meta_key = 'related_promise' and meta_value=" . $row['id'];
        $q = mysqli_query($db, $q);
        $q = mysqli_num_rows($q);
        $row["wp_links"] = $q;

        
        
        
        array_push($promises,$row);
    }
    

$results['parties'] = $parties;
$results['municipalities'] = $municipalities;
$results['categories'] = $categories;
$results['mayors'] = $mayors;
$results['promises'] = $promises; 

echo json_encode($results);
    

?>