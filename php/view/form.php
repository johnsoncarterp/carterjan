<?php
require_once(__DIR__ . "/../model/config.php");
require_once(__DIR__ . "/../controller/login-verify.php");
//require once is used to find files out of the origin file, like a library
if (!authenticateUser()) {
    header("Location: " . $post . "index.php");
    die();
}
//if for authenticate user
?>

<h1>Create Blog Post</h1>
<!--h1 for create blog post-->
<form method="post" action="<?php echo $path . "controller/create-post.php"; ?> ">
    <div>
        <label for="title">Title: </label>
        <input type="text" name="title"/>
    </div>

    <div>
        <label for="post">Post: </label>
        <textarea name="post"></textarea>
    </div>

    <div>
        <button type="submit">Submit</button>
    </div>
</form>
<!--my divs and form for title, post, and submit-->