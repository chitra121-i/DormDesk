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

$data = json_decode(file_get_contents("php://input"));

$student_id = $data->student_id;
$reason = $data->reason;
$out_date = $data->out_date;
$out_time = $data->out_time;
$return_date = $data->return_date;
$return_time = $data->return_time;

$sql = "

INSERT INTO gatepasses
(
    student_id,
    reason,
    out_date,
    out_time,
    return_date,
    return_time,
    status
)

VALUES
(
    '$student_id',
    '$reason',
    '$out_date',
    '$out_time',
    '$return_date',
    '$return_time',
    'Pending'
)

";

if ($conn->query($sql)) {

    // Student Activity
    logStudentActivity(
        $conn,
        $student_id,
        "Gatepass Applied",
        "Your gatepass request has been submitted.",
        "orange"
    );

    // Warden Activity
    logWardenActivity(
        $conn,
        "Gatepass Submitted",
        "A student submitted a gatepass request.",
        "orange"
    );

    echo json_encode([
        "success" => true,
        "message" => "Gatepass Submitted"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);

}

$conn->close();

?>