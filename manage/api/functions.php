<?php 
function checkLogin () { 
    
    global $db;
    
    if(isset($_SESSION['username']) && isset($_SESSION['password'])) { 
    
    $un = $_SESSION["username"]; 
    $pw = $_SESSION["password"];
    
    $sql = "Select * from users where username = '$un' and password = '$pw'";

    $query = mysqli_query($db, $sql);

    $rc = mysqli_num_rows($query);
    if($rc == 1) { 

        $row = mysqli_fetch_assoc($query);

            $un = $row['username'];
            $pw = $row['password'];

            

    }

    else { 

        header("location:login.php?login=failed");


    }
    

    }

    else { 
        header("location:login.php");
    }
    

//    
}

?>