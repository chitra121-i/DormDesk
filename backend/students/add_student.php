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

$name = $data->name;
$roll_no = $data->roll_no;
$phone = $data->phone;
$email = $data->email;
$room_no = $data->room_no;

$password = "student123";

/* -----------------------------
   Check Room Exists
----------------------------- */

$checkRoom = $conn->query("
SELECT *
FROM rooms
WHERE room_no='$room_no'
");

if ($checkRoom->num_rows == 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room Not Found"
    ]);

    exit();
}

$room = $checkRoom->fetch_assoc();

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
   Add Student
----------------------------- */

$sql = "
INSERT INTO students
(
    name,
    roll_no,
    phone,
    email,
    password,
    room_no,
    status,
    joined_at,
    left_at
)

VALUES
(
    '$name',
    '$roll_no',
    '$phone',
    '$email',
    '$password',
    '$room_no',
    'present',
    CURDATE(),
    NULL
)
";

if ($conn->query($sql)) {

    $newStudentId = $conn->insert_id;

    /* Increase Room Count */

    $conn->query("
    UPDATE rooms
    SET current_students = current_students + 1
    WHERE room_no='$room_no'
    ");

    /* Warden Activity */

    logWardenActivity(
        $conn,
        "Student Added",
        "$name added to Room $room_no.",
        "green"
    );

    /* Student Activity */

    logStudentActivity(
        $conn,
        $newStudentId,
        "Hostel Admission",
        "You have been allotted Room $room_no. Welcome to the hostel!",
        "green"
    );

    echo json_encode([
        "success" => true,
        "message" => "Student Added"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed"
    ]);

}

$conn->close();

?>