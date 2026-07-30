<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


include "../db.php";
include "../helpers/activity_helper.php";




$data = json_decode(file_get_contents("php://input"), true);


$request_id = $data["request_id"];
$student_id = $data["student_id"];

$request = $conn->query("
SELECT title
FROM community_requests
WHERE id='$request_id'
")->fetch_assoc();

$title = $request["title"]; 


// Check if already supported

$check = $conn->prepare(
    "SELECT * FROM request_supports 
     WHERE request_id=? AND student_id=?"
);


$check->bind_param(
    "ii",
    $request_id,
    $student_id
);


$check->execute();


$result = $check->get_result();



if($result->num_rows > 0){



    echo json_encode([
        "success"=>false,
        "message"=>"Already supported"
    ]);

    exit();

}



// Insert support

$sql = $conn->prepare(
    "INSERT INTO request_supports
    (request_id, student_id)
    VALUES (?,?)"
);


$sql->bind_param(
    "ii",
    $request_id,
    $student_id
);



if($sql->execute()){

    logStudentActivity(
        $conn,
        $student_id,
        "Supported Community Request",
        "You supported \"$title\".",
        "blue"
    );

    echo json_encode([

        "success"=>true,
        "message"=>"Support added"

    ]);


}
else{


    echo json_encode([

        "success"=>false,
        "message"=>"Failed"

    ]);

}


$conn->close();

?>