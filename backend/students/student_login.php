<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

$sql = "SELECT * FROM students
        WHERE email='$email'
        AND password='$password'
        LIMIT 1";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {

    $student = $result->fetch_assoc();

    echo json_encode([
        "success" => true,
        "student" => $student
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Invalid Credentials"
    ]);
}