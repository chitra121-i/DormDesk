<?php

include "../db.php";

header("Content-Type: application/json");

$student_id = $_GET['student_id'];

$sql = "

SELECT *

FROM fees

WHERE student_id = '$student_id'

ORDER BY id ASC

";

$result = $conn->query($sql);

$fees = [];

while($row = $result->fetch_assoc()){

    $fees[] = $row;

}

echo json_encode([

    "success" => true,
    "fees" => $fees

]);

$conn->close();

?>