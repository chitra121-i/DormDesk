<?php

include "../db.php";

$data = json_decode(
    file_get_contents("php://input")
);

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);

    exit();
}

$room_no = $data->room_no;

$check = $conn->query(
    "SELECT current_students
     FROM rooms
     WHERE room_no='$room_no'"
);

if ($check->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room Not Found"
    ]);

    exit();
}

$row = $check->fetch_assoc();

if ($row["current_students"] > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room Contains Students"
    ]);

    exit();
}

$sql = "
DELETE FROM rooms
WHERE room_no='$room_no'
";

if ($conn->query($sql)) {

    $conn->query("
        INSERT INTO activities
        (
            title,
            description,
            color
        )
        VALUES
        (
            'Room Deleted',
            'Room $room_no removed',
            'red'
        )
    ");

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed To Delete Room"
    ]);
}

$conn->close();

?>