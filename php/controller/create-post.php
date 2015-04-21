<?php

require_once (__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
$connection = new mysqli($host, $username, $password, $database);
//pulls password and stuff from the database and usename strings


$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
//title and post strings

$query = $_SESSION["connection"]->query("INSERT INTO posts SET title= '$title', post= '$post'");
//query for insert into posts

if ($query) {
    echo "<p>Succssesfully Inserted Posts: $title</p>";
}
//echo for inserted posts
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//echo for error in inserted posts
