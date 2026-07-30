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

/* -----------------------------
   Get Student Details
----------------------------- */

$getStudent = $conn->query("
SELECT *
FROM students
WHERE id='$id'
");

if ($getStudent->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Student Not Found"
    ]);

    exit();
}

$student = $getStudent->fetch_assoc();

$studentName = $student["name"];
$room_no = $student["room_no"];

/* -----------------------------
   Move Student to Alumni
----------------------------- */

$conn->query("
UPDATE students
SET
    status='alumni',
    left_at=CURDATE()
WHERE id='$id'
");

/* -----------------------------
   Decrease Room Count
----------------------------- */

$conn->query("
UPDATE rooms
SET current_students = current_students - 1
WHERE room_no='$room_no'
");

/* -----------------------------
   Warden Activity
----------------------------- */

logWardenActivity(
    $conn,
    "Student Removed",
    "$studentName moved to Alumni.",
    "red"
);

/* -----------------------------
   Student Activity
----------------------------- */

logStudentActivity(
    $conn,
    $id,
    "Removed from Hostel",
    "You have been removed from the hostel and marked as Alumni.",
    "red"
);

/* -----------------------------
   Response
----------------------------- */

echo json_encode([
    "success" => true,
    "message" => "Student Moved To Alumni"
]);

$conn->close();

?>