<?php 


include("config.php");
session_start(); 

$un = $_POST["username"];
$pw = $_POST["password"];


// Check login

$sql = "Select * from users where username = '$un' and password = '" . md5($pw) . "'";

$query = mysqli_query($db, $sql);

$rc = mysqli_num_rows($query);
if($rc == 1) { 

    $row = mysqli_fetch_assoc($query);

        $un = $row['username'];
        $pw = $row['password'];

        $_SESSION["username"] = $un; 
        $_SESSION["password"] = $pw;
        $_SESSION["name"] = $row["first_name"] . " " . $row["last_name"];
    
        header("location: index.php");

}

else { 

    header("location:login.php?login=failed");
    
}



//$rc = $query->num_rows;
//
//
//	
//    
//    while($row = $query->fetch_assoc()){
//        
//       echo md5("lb309x");
//        echo "<br />";
//        echo $row[password];
//        
//        if( md5("lb309xx") == $row[password]) { 
//            echo "Something";
//        }
//        else { 
//            echo "something else";
//        }
//        
//    
//    
//    }

    


?>