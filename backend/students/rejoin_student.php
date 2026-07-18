<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;
$room_no = $data->room_no;

/* Get Student Name */

$studentQuery = $conn->query(
"
SELECT name
FROM students
WHERE id='$id'
"
);

$student =
$studentQuery->fetch_assoc();

$studentName =
$student["name"];

/* Check Room */

$roomQuery = $conn->query(
"
SELECT *
FROM rooms
WHERE room_no='$room_no'
"
);

if($roomQuery->num_rows == 0){

    echo json_encode([
        "success"=>false,
        "message"=>"Room Not Found"
    ]);

    exit();
}

$room = $roomQuery->fetch_assoc();

if(
    $room["current_students"]
    >=
    $room["capacity"]
){

    echo json_encode([
        "success"=>false,
        "message"=>"Room Full"
    ]);

    exit();
}

/* Rejoin Student */

$conn->query(
"
UPDATE students
SET
status='present',
room_no='$room_no',
left_at=NULL
WHERE id='$id'
"
);

/* Increase Room Count */

$conn->query(
"
UPDATE rooms
SET current_students =
current_students + 1
WHERE room_no='$room_no'
"
);

/* Activity Log */

$conn->query(
"
INSERT INTO activities
(
title,
description,
color
)
VALUES
(
'Student Rejoined',
'$studentName rejoined in room $room_no',
'green'
)
"
);

echo json_encode([
    "success"=>true,
    "message"=>"Student Rejoined Successfully"
]);

$conn->close();

?>