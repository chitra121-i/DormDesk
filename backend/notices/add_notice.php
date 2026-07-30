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

    // Warden Activity
    logWardenActivity(
        $conn,
        "Notice Published",
        "Published notice \"$title\".",
        "orange"
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
            "Notice Published",
            $title,
            "orange"
        );

    }

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