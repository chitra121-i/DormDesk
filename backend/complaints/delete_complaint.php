<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;

$sql = "

DELETE FROM complaints
WHERE id='$id'

";

if($conn->query($sql)){

    echo json_encode([
        "success"=>true,
        "message"=>"Complaint Deleted"
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>"Delete Failed"
    ]);

}

$conn->close();

?>