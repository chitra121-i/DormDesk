<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;
$status = $data->status;

$sql = "

UPDATE complaints
SET status='$status'
WHERE id='$id'

";

if($conn->query($sql)){

    /* Activity Log */

   $complaint = $conn->query("
SELECT student_id
FROM complaints
WHERE id='$id'
")->fetch_assoc();

$student_id = $complaint['student_id'];

$conn->query("

INSERT INTO activities
(student_id, title, description, color)

VALUES
(
    '$student_id',
    'Complaint Updated',
    'Your complaint status has been updated',
    'orange'
)

");

    echo json_encode([
        "success"=>true,
        "message"=>"Status Updated"
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>"Update Failed"
    ]);

}

$conn->close();

?>