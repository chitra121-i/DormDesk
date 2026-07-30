<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);

    exit();
}

$id = $data->id;
$room_no = $data->room_no;

/* -----------------------------
   Get Student Details
----------------------------- */

$studentQuery = $conn->query("
SELECT *
FROM students
WHERE id='$id'
");

if ($studentQuery->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Student Not Found"
    ]);

    exit();
}

$student = $studentQuery->fetch_assoc();

$studentName = $student["name"];

/* -----------------------------
   Check Room Exists
----------------------------- */

$roomQuery = $conn->query("
SELECT *
FROM rooms
WHERE room_no='$room_no'
");

if ($roomQuery->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room Not Found"
    ]);

    exit();
}

$room = $roomQuery->fetch_assoc();

/* -----------------------------
   Check Room Capacity
----------------------------- */

if ($room["current_students"] >= $room["capacity"]) {

    echo json_encode([
        "success" => false,
        "message" => "Room Full"
    ]);

    exit();
}

/* -----------------------------
   Rejoin Student
----------------------------- */

$conn->query("
UPDATE students
SET
    status='present',
    room_no='$room_no',
    joined_at=CURDATE(),
    left_at=NULL
WHERE id='$id'
");

/* -----------------------------
   Increase Room Count
----------------------------- */

$conn->query("
UPDATE rooms
SET current_students = current_students + 1
WHERE room_no='$room_no'
");

/* -----------------------------
   Warden Activity
----------------------------- */

logWardenActivity(
    $conn,
    "Student Rejoined",
    "$studentName rejoined and was assigned to Room $room_no.",
    "green"
);

/* -----------------------------
   Student Activity
----------------------------- */

logStudentActivity(
    $conn,
    $id,
    "Hostel Rejoined",
    "Welcome back! You have been assigned to Room $room_no.",
    "green"
);

/* -----------------------------
   Response
----------------------------- */

echo json_encode([
    "success" => true,
    "message" => "Student Rejoined Successfully"
]);

$conn->close();

?>