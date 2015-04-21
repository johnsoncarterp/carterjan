<?php
require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
?>


<h1>Register</h1>
<!--h1 for register-->
<form method="post" action="<?php echo $path . "controller/create-user.php"; ?> ">
    <div>
        <label for="email">Email: </label>
        <input type="text" name="email" />
    </div>

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
<!--my divs and form for email, password, username, and submit-->