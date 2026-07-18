<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input")
);

$id = $data->id;
$name = $data->name;
$roll_no = $data->roll_no;
$phone = $data->phone;
$email = $data->email;
$new_room = $data->room_no;

$studentQuery = $conn->query(
"
SELECT *
FROM students
WHERE id='$id'
"
);

if($studentQuery->num_rows == 0){

    echo json_encode([
        "success"=>false,
        "message"=>"Student Not Found"
    ]);

    exit();
}

$student = $studentQuery->fetch_assoc();

$old_room = $student["room_no"];

if($old_room != $new_room){

    $roomQuery = $conn->query(
    "
    SELECT *
    FROM rooms
    WHERE room_no='$new_room'
    "
    );

    if($roomQuery->num_rows == 0){

        echo json_encode([
            "success"=>false,
            "message"=>"New Room Not Found"
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
            "message"=>"New Room Is Full"
        ]);

        exit();
    }

    $conn->query(
    "
    UPDATE rooms
    SET current_students =
    current_students - 1
    WHERE room_no='$old_room'
    "
    );

    $conn->query(
    "
    UPDATE rooms
    SET current_students =
    current_students + 1
    WHERE room_no='$new_room'
    "
    );
}

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

if($conn->query($sql)){

    echo json_encode([
        "success"=>true,
        "message"=>"Student Updated"
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>"Update Failed"
    ]);
}

$conn->close();

?>