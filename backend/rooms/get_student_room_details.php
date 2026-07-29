<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include "../db.php";

if (!isset($_GET["student_id"])) {

    echo json_encode([
        "success" => false,
        "message" => "Student ID is required"
    ]);

    exit();
}

$student_id = intval($_GET["student_id"]);


// ----------------------------
// Get Student Details
// ----------------------------

$studentQuery = "
SELECT
    id,
    name,
    room_no
FROM students
WHERE id = ?
";

$stmt = $conn->prepare($studentQuery);
$stmt->bind_param("i", $student_id);
$stmt->execute();

$studentResult = $stmt->get_result();

if ($studentResult->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Student not found"
    ]);

    exit();
}

$student = $studentResult->fetch_assoc();

$room_no = $student["room_no"];

$stmt->close();


// ----------------------------
// Get Room Details
// ----------------------------

$roomQuery = "
SELECT
    room_no,
    floor_no,
    capacity,
    current_students
FROM rooms
WHERE room_no = ?
";

$stmt = $conn->prepare($roomQuery);
$stmt->bind_param("s", $room_no);
$stmt->execute();

$roomResult = $stmt->get_result();

if ($roomResult->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room not found"
    ]);

    exit();
}

$room = $roomResult->fetch_assoc();

$stmt->close();


// ----------------------------
// Get Roommates
// ----------------------------

$roommateQuery = "
SELECT
    id,
    name
FROM students
WHERE room_no = ?
ORDER BY name ASC
";

$stmt = $conn->prepare($roommateQuery);
$stmt->bind_param("s", $room_no);
$stmt->execute();

$roommateResult = $stmt->get_result();

$roommates = [];

while ($row = $roommateResult->fetch_assoc()) {

    $roommates[] = $row;

}

$stmt->close();

$conn->close();


// ----------------------------
// Return Response
// ----------------------------

echo json_encode([
    "success" => true,
    "student" => $student,
    "room" => $room,
    "roommates" => $roommates
]);

?>