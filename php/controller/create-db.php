<?php

require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
        . "id int (11) NOT NULL AUTO_INCREMENT,"
        . "title varchar (255) NOT NULL,"
        . "post text NOT NULL,"
        . "PRIMARY KEY (id))");
//my create table post query
if ($query) {
    echo "<p>Succesfuly created table: posts</p>";
}
//my echo Succesfuly created table: posts
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//my echo for error in posts
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int (11) NOT NULL AUTO_INCREMENT,"
        . "username varchar (30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "PRIMARY KEY (id))");
//my query for create table users
if ($query) {
    echo "<p>Succesfuly created table: users</p>";
}
//my echo for Succesfuly created table: users
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
//my echo for error in users