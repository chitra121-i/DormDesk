<?php

include "../db.php";

header("Content-Type: application/json");

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;

/* Get Notice Title Before Delete */

$getNotice = $conn->query("
SELECT title
FROM notices
WHERE id='$id'
");

$notice = $getNotice->fetch_assoc();

$noticeTitle = $notice['title'];

$sql = "

DELETE FROM notices
WHERE id='$id'

";

if($conn->query($sql)){

    $conn->query("
    INSERT INTO activities
    (
    title,
    description,
    color
    )
    VALUES
    (
    'Notice Deleted',
    '$noticeTitle',
    'red'
    )
    ");

    echo json_encode([

        "success" => true,
        "message" => "Notice Deleted"

    ]);

}else{

    echo json_encode([

        "success" => false,
        "message" => "Delete Failed"

    ]);

}

$conn->close();

?>