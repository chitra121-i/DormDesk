<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT
status,
COUNT(*) AS total

FROM complaints

GROUP BY status

";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()){

    $data[] = [
        "name" => $row["status"],
        "value" => (int)$row["total"]
    ];

}

echo json_encode([
    "success" => true,
    "data" => $data
]);

$conn->close();

?>