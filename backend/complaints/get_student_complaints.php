<?php

include "../db.php";

header("Content-Type: application/json");

$student_id = $_GET['student_id'];

$sql = "

SELECT *

FROM complaints

WHERE student_id='$student_id'

ORDER BY created_at DESC

";

$result = $conn->query($sql);

$complaints = [];

while($row = $result->fetch_assoc()){

    $complaints[] = $row;

}

echo json_encode([
    "success"=>true,
    "complaints"=>$complaints
]);

$conn->close();

?>