<?php

include "../db.php";

$data = json_decode(file_get_contents("php://input"));

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "No Data Received"
    ]);

    exit();
}

$room_no = $data->room_no;
$floor_no = $data->floor_no;
$capacity = $data->capacity;

$check = $conn->query(
    "SELECT * FROM rooms
     WHERE room_no='$room_no'"
);

if ($check->num_rows > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Room Already Exists"
    ]);

    exit();
}

$sql = "
INSERT INTO rooms
(
    room_no,
    floor_no,
    capacity,
    current_students
)
VALUES
(
    '$room_no',
    '$floor_no',
    '$capacity',
    0
)
";

if ($conn->query($sql)) {

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
        'Room Added',
        'Room $room_no created on Floor $floor_no',
        'blue'
    )
    "
    );

    echo json_encode([
        "success" => true,
        "message" => "Room Added Successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed To Add Room"
    ]);
}

$conn->close();

?>