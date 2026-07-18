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

$name = $data->name;
$roll_no = $data->roll_no;
$phone = $data->phone;
$email = $data->email;
$room_no = $data->room_no;

$password = "student123";

$checkRoom = $conn->query(
"
SELECT *
FROM rooms
WHERE room_no='$room_no'
"
);

if($checkRoom->num_rows == 0){

    echo json_encode([
        "success"=>false,
        "message"=>"Room Not Found"
    ]);

    exit();
}

$room = $checkRoom->fetch_assoc();

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

if($conn->query($sql)){

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
        'Student Added',
        '$name added to Room $room_no',
        'green'
    )
    "
    );

    echo json_encode([
        "success"=>true,
        "message"=>"Student Added"
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>"Failed"
    ]);
}

$conn->close();

?>