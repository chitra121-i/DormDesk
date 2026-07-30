<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;

/* Get gatepass details before updating */

$result = $conn->query("
SELECT student_id
FROM gatepasses
WHERE id='$id'
");

$gatepass = $result->fetch_assoc();

$student_id = $gatepass["student_id"];

/* Approve gatepass */

$sql = "
UPDATE gatepasses
SET status='Approved'
WHERE id='$id'
";

if ($conn->query($sql)) {

    // Warden Activity
    logWardenActivity(
        $conn,
        "Gatepass Approved",
        "Approved Gatepass ID $id.",
        "green"
    );

    // Student Activity
    logStudentActivity(
        $conn,
        $student_id,
        "Gatepass Approved",
        "Your gatepass request has been approved.",
        "green"
    );

    echo json_encode([
        "success" => true,
        "message" => "Gate Pass Approved"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed"
    ]);

}

$conn->close();

?>