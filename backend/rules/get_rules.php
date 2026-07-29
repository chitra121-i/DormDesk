<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include "../db.php";

$sql = "
    SELECT
        id,
        rule_text,
        created_at,
        updated_at

    FROM hostel_rules

    ORDER BY id ASC
";

$result = $conn->query($sql);

if (!$result) {

    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);

    exit();
}

$rules = [];

while ($row = $result->fetch_assoc()) {

    $rules[] = $row;

}

echo json_encode([
    "success" => true,
    "rules" => $rules
]);

$conn->close();

?>