<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "hostel_db");

if ($conn->connect_error) {

    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed"
    ]);

    exit();

}

$data = json_decode(file_get_contents("php://input"));

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);

    exit();

}

$email = $data->email;
$password = $data->password;

$sql = "

SELECT *

FROM wardens

WHERE email='$email'

AND password='$password'

";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $warden = $result->fetch_assoc();

    echo json_encode([

        "success" => true,
        "message" => "Login Successful",
        "warden" => $warden

    ]);

} else {

    echo json_encode([

        "success" => false,
        "message" => "Invalid Credentials"

    ]);

}

$conn->close();

?>