<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "hostel_db"
);

if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}

echo "Database Connected Successfully";

?>