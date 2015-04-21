<?php

require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//username and password strings

$query = $_SESSION["connection"]->query("SELECT salt, password FROM users WHERE username = '$username'");
//query for salt
if ($query->num_rows == 1) {
    $row = $query->fetch_array();
    //checking for 1 result
    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        echo "<p>login successful!</p>";
    }
    //echo for login successful
    else {
        echo "<p>invalid username and password</p>";
    }
    //echo for invalid username and password
} else {
    echo "<p>invalid username and password</p>";
}
//echo for invalid username and password