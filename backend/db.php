<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli(
    "127.0.0.1",
    "root",
    "",
    "hostel_db"
);

if ($conn->connect_error) {

    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed"
    ]);

    exit();
}

?>