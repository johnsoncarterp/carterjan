<?php
require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
?>

<h1>Login</h1>
<!--h1 for login-->
<form  method="post" action="<?php echo $path . "controller/login-user.php"; ?> ">
    <div>
        <label for="username">Username: </label>
        <input type="text" name="username" /> 
    </div>

    <div>
        <label for="password">Password: </label>
        <input type="password" name="password" />
    </div>

    <div>
        <button type="submit">Submit</button>
    </div>
</form>
<!--my divs and form for username, password, and submit-->