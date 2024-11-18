<?php
$servername = "localhost";
$username = "root"; // or new username
$password = ""; // use the correct password
$dbname = "KCS_DB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
