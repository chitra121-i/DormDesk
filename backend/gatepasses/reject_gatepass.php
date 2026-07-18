<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;
$reason = $data->reason;

$sql = "

UPDATE gatepasses

SET
status='Rejected',
rejection_reason='$reason'

WHERE id='$id'

";

if($conn->query($sql)){

    /* Activity Log */

   $gatepass = $conn->query("
SELECT student_id
FROM gatepasses
WHERE id='$id'
")->fetch_assoc();

$student_id = $gatepass['student_id'];

$conn->query("

INSERT INTO activities
(student_id, title, description, color)

VALUES
(
    '$student_id',
    'Gatepass Rejected',
    'Your gatepass request has been rejected',
    'red'
)

");
    echo json_encode([

        "success"=>true,
        "message"=>"Gate Pass Rejected"

    ]);

}else{

    echo json_encode([

        "success"=>false,
        "message"=>"Failed"

    ]);

}

$conn->close();

?>