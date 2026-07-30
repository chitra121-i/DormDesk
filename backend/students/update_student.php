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
$name = $data->name;
$roll_no = $data->roll_no;
$phone = $data->phone;
$email = $data->email;
$new_room = $data->room_no;

/* -----------------------------
   Get Student
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

$old_room = $student["room_no"];

/* -----------------------------
   If Room Changed
----------------------------- */

if ($old_room != $new_room) {

    $roomQuery = $conn->query("
    SELECT *
    FROM rooms
    WHERE room_no='$new_room'
    ");

    if ($roomQuery->num_rows == 0) {

        echo json_encode([
            "success" => false,
            "message" => "New Room Not Found"
        ]);

        exit();
    }

    $room = $roomQuery->fetch_assoc();

    if ($room["current_students"] >= $room["capacity"]) {

        echo json_encode([
            "success" => false,
            "message" => "New Room Is Full"
        ]);

        exit();
    }

    /* Decrease Old Room Count */

    $conn->query("
    UPDATE rooms
    SET current_students = current_students - 1
    WHERE room_no='$old_room'
    ");

    /* Increase New Room Count */

    $conn->query("
    UPDATE rooms
    SET current_students = current_students + 1
    WHERE room_no='$new_room'
    ");
}

/* -----------------------------
   Update Student
----------------------------- */

$sql = "
UPDATE students
SET
    name='$name',
    roll_no='$roll_no',
    phone='$phone',
    email='$email',
    room_no='$new_room'
WHERE id='$id'
";

if ($conn->query($sql)) {

    if ($old_room != $new_room) {

        /* Warden Activity */

        logWardenActivity(
            $conn,
            "Student Room Changed",
            "$name moved from Room $old_room to Room $new_room.",
            "blue"
        );

        /* Student Activity */

        logStudentActivity(
            $conn,
            $id,
            "Room Changed",
            "Your room has been changed from Room $old_room to Room $new_room.",
            "blue"
        );

    } else {

        /* Warden Activity */

        logWardenActivity(
            $conn,
            "Student Updated",
            "Updated details of $name.",
            "orange"
        );

        /* Student Activity */

        logStudentActivity(
            $conn,
            $id,
            "Profile Updated",
            "Your hostel information has been updated.",
            "orange"
        );
    }

    echo json_encode([
        "success" => true,
        "message" => "Student Updated"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Update Failed"
    ]);
}

$conn->close();

?>