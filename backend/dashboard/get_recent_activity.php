<?php

include "../db.php";

header("Content-Type: application/json");

$result = $conn->query("
SELECT *
FROM activities
ORDER BY created_at DESC
LIMIT 5
");

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