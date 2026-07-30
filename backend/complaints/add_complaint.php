<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$student_id = $data["student_id"];
$allowedCategories = [
    "Electrical and Internet",
    "Bathroom and Washroom",
    "Theft",
    "Mess",
    "Bullying and Ragging",
    "Other"
];

$category = trim($data["category"]);

if(!in_array($category, $allowedCategories)){
    echo json_encode([
        "success" => false,
        "message" => "Invalid complaint category."
    ]);
    exit();
}
$description = $data["description"];

$sql = "

INSERT INTO complaints
(student_id, category, description, status, reply)

VALUES
('$student_id','$category','$description','Pending','')

";

if($conn->query($sql)){

    logStudentActivity(
        $conn,
        $student_id,
        "Complaint Submitted",
        "Your complaint has been submitted successfully.",
        "orange"
    );

    echo json_encode([
        "success" => true,
        "message" => "Complaint Submitted"
    ]);

}else{

    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);

}

$conn->close();

?>