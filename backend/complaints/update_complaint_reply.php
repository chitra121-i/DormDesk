<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Content-Type: application/json");

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;
$reply = $data->reply;

$sql = "

UPDATE complaints
SET reply='$reply'
WHERE id='$id'

";

$result = $conn->query("
SELECT student_id
FROM complaints
WHERE id='$id'
");

$row = $result->fetch_assoc();

$student_id = $row["student_id"];

if($conn->query($sql)){

    logWardenActivity(
        $conn,
        "Complaint Replied",
        "Replied to Complaint ID $id",
        "blue"
    );

    logStudentActivity(
        $conn,
        $student_id,
        "Complaint Replied",
        "The warden has replied to your complaint.",
        "blue"
    );

    echo json_encode([
        "success"=>true,
        "message"=>"Reply Saved"
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>"Failed"
    ]);

}



$conn->close();

?>