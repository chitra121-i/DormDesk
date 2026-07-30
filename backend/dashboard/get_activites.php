<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT
id,
title,
description,
color,
created_at

FROM activities

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