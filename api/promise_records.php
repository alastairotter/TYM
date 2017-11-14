<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$id = $_GET['id'];
$all = $_GET['all'];
$tracked = $_GET['tracked'];

if($_GET['category']) { $category = $_GET['category']; }




$results = array();
$cats = array(); 
$x = 0;

// get total stats
$sql = "Select * from promises where mayor = '$id'"; 
$query = mysqli_query($db, $sql);
$promise_count_total = mysqli_num_rows($query);

$sql = "Select * from promises where mayor = '$id' and tracked = 'Yes'"; 
$query = mysqli_query($db, $sql);
$promises_tracked = mysqli_num_rows($query);

$sql = "Select * from promises where mayor = '$id' and tracked = 'No'"; 
$query = mysqli_query($db, $sql);
$promises_untracked = mysqli_num_rows($query);





if($id && $tracked) {
    
    
    // get categories
    
      if($all == "1") { 
      
       
          $sql = "Select distinct category from promises where mayor = '$id'"; 
       
          
        
    }
    
    else { 
        
        
        $sql = "Select distinct category from promises where mayor = '$id' and tracked = '$tracked'";
        
    
    } 
    
    $query = mysqli_query($db, $sql);
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
        
        // get category names
        $q = "Select * from categories where id = " . $row['category'];
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['cat_name'] = $q['category'];
//        
        
        
//        $row['cat_id'] = $row['id'];
//        $row['cat_name'] = $row['category'];
        
        $row = array_map('utf8_encode', $row);
        array_push($cats,$row);
        
    }
    
    
    // end categories
    
    
    // get statuses 
    $statuses = array();
    $sql = "select distinct status from promises";
    $query = mysqli_query($db, $sql);
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
//        if($row['status'] == "") { $row['status'] = "Untracked"; }
        $row = array_map('utf8_encode', $row);
        array_push($statuses,$row);
    }
    
    
    
    
    
    if($all == "1") { 
        
        if($category) {
            if($_GET['status']) { 
                $status = $_GET['status'];
                $sql = "Select * from promises where mayor = '$id' and category = '$category' and status = '$status'"; 
            }
            else { 
                $sql = "Select * from promises where mayor = '$id' and category = '$category'"; 
            }
        
        }
        else { 
            if($_GET['status']) { 
                $status = $_GET['status'];
                $sql = "Select * from promises where mayor = '$id' and status = '$status'";
            }
            else { 
                $sql = "Select * from promises where mayor = '$id'";
            }
        
        }
        
    }
    
    else { 
        
        if($category) { 
            
        $sql = "Select * from promises where mayor = '$id' and tracked = '$tracked' and category = '$category'";
        }
        else { 
        $sql = "Select * from promises where mayor = '$id' and tracked = '$tracked'";
        }
    
    }
    
    if($_GET['startdate']) { 
//        echo "There is start date";
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        $sql .= " and due_date >= '$startdate' and due_date <= '$enddate'";
//        echo $sql;
    }

    $total_promises = 0; 
    $tracked_promises = 0; 
    $untracked_promises = 0; 
    
//$sql = "Select * from promises";
    $query = mysqli_query($db, $sql);
    $promises = array();
    while($row = mysqli_fetch_assoc($query)) {
        
//        var_dump($row);
        
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
        // get category name
        $q = "select * from categories where id = " . $row['category'];  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row['category_name'] = $q['category'];
        // get mayor municipality
        $q = "select * from municipalities where id = '$muni'";  
        $q = mysqli_query($db, $q);
        $q = mysqli_fetch_assoc($q);
        $row["municipality_name"] = $q["municipality"];
        $row["municipality_id"] = $muni;
        // get WP links
        $q = "select * from wp_postmeta where meta_key = 'related_promise' and meta_value=" . $row['id'];
        $q = mysqli_query($db, $q);
        $q = mysqli_num_rows($q);
        $row["wp_links"] = $q;
        
        
        $results['stats']['mayor_name'] = $row['mayor_name'];
        $results['stats']['party_id'] = $row['party_id'];
        $results['stats']['party_name'] = $row['party_name'];
        $results['stats']['municipality_id'] = $row['municipality_id'];
        $results['stats']['municipality_name'] = $row['municipality_name'];
        $results['stats']['mayor_photo'] = $row['mayor_photo'];
        
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
    
$results['statuses'] = $statuses;
$results['stats']['total_promises'] = $promise_count_total; 
$results['stats']['tracked_promises'] = $promises_tracked; 
$results['stats']['untracked_promises'] = $promises_untracked; 
$results['stats']['mayor_id'] = $id;
    
if($all == "1") { 
    $results['stats']['record_type'] = "all";
    $results['stats']['current_record_count'] = $total_promises;
}

else {
    
    if($tracked == "Yes") { $results['stats']['record_type'] = "tracked"; 
                            $results['stats']['current_record_count'] = $total_promises;
                          }
    else { $results['stats']['record_type'] = "untracked"; 
            $results['stats']['current_record_count'] = $total_promises;
            }

}
    
    

//array_push($results, $cats);
    $results['cats'] = $cats;
    
echo json_encode($results);
    
}
    

?>