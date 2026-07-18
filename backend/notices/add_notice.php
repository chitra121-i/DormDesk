<?php

include "../db.php";
include "../helpers/activity_helper.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$title = $data->title;
$description = $data->description;

$sql = "

INSERT INTO notices
(title, description)

VALUES

('$title','$description')

";

if($conn->query($sql)){

    // Activity Log (Visible to all students)

   addActivity(
    $conn,
    null,
    "Notice Published",
    $title,
    "orange"
);

    echo json_encode([

        "success" => true,
        "message" => "Notice Published"

    ]);

}else{

    echo json_encode([

        "success" => false,
        "message" => $conn->error

    ]);

}

$conn->close();

?>