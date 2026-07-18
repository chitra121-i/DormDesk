<?php

include "../db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$student_id = $_GET["student_id"];

$sql = "
SELECT *
FROM gatepasses
WHERE student_id = '$student_id'
ORDER BY created_at DESC
";

$result = $conn->query($sql);

$gatepasses = [];

while($row = $result->fetch_assoc()){
    $gatepasses[] = $row;
}

echo json_encode([
    "success" => true,
    "gatepasses" => $gatepasses
]);

$conn->close();

?>