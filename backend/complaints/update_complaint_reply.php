<?php

include "../db.php";

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

if($conn->query($sql)){

    $conn->query("
    INSERT INTO activities
    (type,title,description)
    VALUES
    (
    'complaint_reply',
    'Complaint Reply Updated',
    'Reply updated for Complaint ID $id'
    )
    ");

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