<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;
$reason = $data->reason;

/* Get gatepass details before updating */

$result = $conn->query("
SELECT student_id
FROM gatepasses
WHERE id='$id'
");

$gatepass = $result->fetch_assoc();

$student_id = $gatepass["student_id"];

/* Reject gatepass */

$sql = "

UPDATE gatepasses

SET
    status='Rejected',
    rejection_reason='$reason'

WHERE id='$id'

";

if ($conn->query($sql)) {

    // Warden Activity
    logWardenActivity(
        $conn,
        "Gatepass Rejected",
        "Rejected Gatepass ID $id.",
        "red"
    );

    // Student Activity
    logStudentActivity(
        $conn,
        $student_id,
        "Gatepass Rejected",
        "Your gatepass request has been rejected. Reason: $reason",
        "red"
    );

    echo json_encode([

        "success" => true,
        "message" => "Gate Pass Rejected"

    ]);

} else {

    echo json_encode([

        "success" => false,
        "message" => "Failed"

    ]);

}

$conn->close();

?>