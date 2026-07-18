<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;

$sql = "
UPDATE gatepasses
SET status='Approved'
WHERE id='$id'
";

if ($conn->query($sql)) {

    // Get student_id of this gatepass
    $gatepass = $conn->query("
        SELECT student_id
        FROM gatepasses
        WHERE id='$id'
    ")->fetch_assoc();

    $student_id = $gatepass['student_id'];

    // Insert activity
    $conn->query("
        INSERT INTO activities
        (student_id, title, description, color)
        VALUES
        (
            '$student_id',
            'Gatepass Approved',
            'Your gatepass request has been approved',
            'green'
        )
    ");

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