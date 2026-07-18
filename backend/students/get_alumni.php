<?php

include "../db.php";

header("Content-Type: application/json");

$result = $conn->query("
SELECT *
FROM students
WHERE status='alumni'
ORDER BY name ASC
");

$students = [];

while($row = $result->fetch_assoc()){
    $students[] = $row;
}

echo json_encode([
    "success" => true,
    "students" => $students
]);

$conn->close();

?>