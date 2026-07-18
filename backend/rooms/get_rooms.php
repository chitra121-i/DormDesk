<?php

include "../db.php";

$sql = "
SELECT *
FROM rooms
ORDER BY room_no ASC
";

$result = $conn->query($sql);

$rooms = [];

while ($room = $result->fetch_assoc()) {

    $roomNo = $room["room_no"];

    $studentSql = "
    SELECT name
    FROM students
    WHERE room_no = '$roomNo'
    AND status != 'alumni'
    ORDER BY name ASC
    ";

    $studentResult = $conn->query($studentSql);

    $students = [];

    while ($student = $studentResult->fetch_assoc()) {

        $students[] = $student["name"];
    }

    $rooms[] = [
        "roomNo" => $room["room_no"],
        "floorNo" => $room["floor_no"],
        "capacity" => (int)$room["capacity"],
        "currentStudents" => (int)$room["current_students"],
        "students" => $students
    ];
}

echo json_encode([
    "success" => true,
    "rooms" => $rooms
]);

$conn->close();

?>