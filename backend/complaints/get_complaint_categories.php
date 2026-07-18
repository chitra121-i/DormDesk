<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT
category,
COUNT(*) AS total

FROM complaints

GROUP BY category

ORDER BY total DESC

";

$result = $conn->query($sql);

$data = [];

while($row = $result->fetch_assoc()){

    $data[] = [
        "name" => $row["category"],
        "value" => (int)$row["total"]
    ];

}

echo json_encode([
    "success" => true,
    "data" => $data
]);

$conn->close();

?>