<?php

require_once(__DIR__ . "/../model/config.php");
//require once is used to find files out of the origin file, like a library
$query = "SELECT * FROM posts";
$result = $_SESSION["connection"]->query($query);
//query for select from posts and result for connection
if ($result) {
    while ($row = mysqli_fetch_array($result)) {
        echo "<div class = 'post'>";
        echo "<h2>" . $row['title'] . "</h2>";
        echo "<br />";
        echo "<p>" . $row['post'] . "</p>";
        echo "<br/>";
        echo "</div";
    }
}
//echos for rows of title and post