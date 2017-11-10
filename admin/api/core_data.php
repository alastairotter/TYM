<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

include("config.php");



$results = array();
$parties = array(); 
$mayors = array();
$municipalities = array(); 
$categories = array(); 




        
        $sql = "Select * from parties";
            $query = mysqli_query($db, $sql);
            
            while($row = mysqli_fetch_assoc($query)) {
                $row = array_map('utf8_encode', $row);
                array_push($parties,$row);
                }
        
            
        
  



        
        $sql = "Select * from municipalities";
            $query = mysqli_query($db, $sql);
            $municipalities = array();
            while($row = mysqli_fetch_assoc($query)) { 
                $row = array_map('utf8_encode', $row);
                array_push($municipalities,$row);
            }
        
           



        
        $sql = "Select * from categories";
            $query = mysqli_query($db, $sql);
            $categories = array();
            while($row = mysqli_fetch_assoc($query)) {
                $row = array_map('utf8_encode', $row);
                array_push($categories,$row);

            }
        
          
        
   


        
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
        
       
        
  



//        $sql = "Select * from promises limit $start, $count";
//            $query = mysqli_query($db, $sql);
//            $promises = array();
//            while($row = mysqli_fetch_assoc($query)) {
//                // get mayor name
//                $q = "select * from mayors where id = " . $row['mayor'];  
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $muni = $q["municipality"];
//                $row["mayor_name"] = $q["name"];
//                // get mayor municipality
//                $q = "select * from municipalities where id = '$muni'";  
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row["municipality_name"] = $q["municipality"];
//                $row["municipality_id"] = $muni;
//                // get category name
//                $q = "select * from categories where id = " . $row["category"];  
//                $q = mysqli_query($db, $q);
//                $q = mysqli_fetch_assoc($q);
//                $row['category_name'] = $q["category"];
//                $row = array_map('utf8_encode', $row);
//                array_push($results,$row);
//                
//                
//            }
        
           

        
        

    

$results['parties'] = $parties;
$results['municipalities'] = $municipalities;
$results['categories'] = $categories;
$results['mayors'] = $mayors;
//$results['promises'] = $promises; 

echo json_encode($results);
    

?>