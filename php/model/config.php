<?php

require_once(__DIR__ . "/database.php");
//require once is used to find files out of the origin file, like a library
session_start();
//starts session
session_regenerate_id(true);
//regenerates session

$path = "/carterblog/";
//my path
$host = "localhost";
//my host
$username = "root";
//my username
$password = "root";
//my password
$database = "blog_db";
//my database

if (!isset($_SESSION["connection"])) {
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}
//connection to host, username, password, database