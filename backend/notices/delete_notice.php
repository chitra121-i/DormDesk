<?php

include "../db.php";
include "../helpers/activity_helper.php";

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

$noticeTitle = $notice["title"];

/* Delete Notice */

$sql = "

DELETE FROM notices
WHERE id='$id'

";

if($conn->query($sql)){

    // Warden Activity
    logWardenActivity(
        $conn,
        "Notice Deleted",
        "Deleted notice \"$noticeTitle\".",
        "red"
    );

    // Student Activity
    $students = $conn->query("
        SELECT id
        FROM students
        WHERE approval_status='Approved'
    ");

    while($student = $students->fetch_assoc()){

        logStudentActivity(
            $conn,
            $student["id"],
            "Notice Deleted",
            $noticeTitle,
            "red"
        );

    }

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