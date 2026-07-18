<?php

include "../db.php";

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;

$getStudent = $conn->query(
"
SELECT *
FROM students
WHERE id='$id'
"
);

$student =
$getStudent->fetch_assoc();

$studentName =
$student["name"];

$room_no =
$student["room_no"];

$conn->query(
"
UPDATE students
SET
status='alumni',
left_at=CURDATE()
WHERE id='$id'
"
);

$conn->query(
"
UPDATE rooms
SET current_students =
current_students - 1
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
'Student Removed',
'$studentName moved to alumni',
'red'
)
"
);

echo json_encode([
    "success"=>true,
    "message"=>"Student Moved To Alumni"
]);

$conn->close();

?>