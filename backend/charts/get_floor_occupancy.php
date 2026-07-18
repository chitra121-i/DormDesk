<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT

floor_no,

SUM(current_students) AS occupied,

SUM(capacity) AS capacity

FROM rooms

GROUP BY floor_no

ORDER BY floor_no

";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()){

    $data[] = [

        "floor" => $row["floor_no"],
        "occupied" => (int)$row["occupied"],
        "capacity" => (int)$row["capacity"]

    ];

}

echo json_encode([

    "success" => true,
    "data" => $data

]);

$conn->close();

?>