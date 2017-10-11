
<!doctype html>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Track Your Mayor</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
    <link rel="stylesheet" href="../lib/bootstrap4/css/bootstrap.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body id="login">

<div class="container">
   
   <div class="login-box">
    
    <?php 
    if($_GET[login] == "failed") { 
        ?>
        <div class="login-failed">Login failed, please try again</div>
        <?php 
    }
    ?>
    
       
       <form id="login-form" method="post" action = "auth.php">
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" class="form-control form-control-sm" name="username" aria-describedby="emailHelp">
<!--    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control form-control-sm" name="password">
  </div>
  <div class="form-check">
<!--
    <label class="form-check-label">
      <input type="checkbox" class="form-check-input">
      Check me out
    </label>
-->
  </div>
  <button type="submit" class="btn btn-info btn-sm">Log In</button>
</form>
       
<!--
       <form>
        Username: <input type="text" name="username"><br />
        Password: <input type="password" name="password"><br />
        <input type="submit" value="login">
        
    </form>
-->
    
    </div>
    
    
</div>

<?php
include("footer.php");
?>


