<?php

include "../db.php";

header("Content-Type: application/json");

$student_id = $_GET["student_id"];

$sql = "

SELECT *

FROM activities

WHERE

student_id='$student_id'

OR

(
    student_id IS NULL
    AND title='Notice Published'
)

ORDER BY created_at DESC

LIMIT 10

";

$result = $conn->query($sql);

$activities = [];

while($row = $result->fetch_assoc()){
    $activities[] = $row;
}

echo json_encode([
    "success" => true,
    "activities" => $activities
]);

$conn->close();

?>