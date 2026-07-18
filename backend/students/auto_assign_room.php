<?php

include "../db.php";

$sql = "
SELECT *
FROM rooms
WHERE current_students < capacity
ORDER BY room_no ASC
LIMIT 1
";

$result = $conn->query($sql);

if($result->num_rows == 0){

    echo json_encode([
        "success" => false,
        "message" => "No Empty Rooms"
    ]);

    exit();
}

$room = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "room_no" => $room["room_no"]
]);

$conn->close();

?>