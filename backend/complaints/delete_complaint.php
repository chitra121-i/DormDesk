<?php

include "../db.php";
include "../helpers/activity_helper.php";

$data = json_decode(
file_get_contents("php://input")
);

$id = $data->id;

$result = $conn->query("
SELECT student_id
FROM complaints
WHERE id='$id'
");

$row = $result->fetch_assoc();

$student_id = $row["student_id"];

header("Content-Type: application/json");



$sql = "

DELETE FROM complaints
WHERE id='$id'

";

if($conn->query($sql)){

    logStudentActivity(
        $conn,
        $student_id,
        "Complaint Deleted",
        "Your complaint has been deleted.",
        "red"
    );

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