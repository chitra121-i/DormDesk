<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include "../db.php";

$sql = "
SELECT
    cr.id,
    cr.title,
    cr.description,
    cr.category,
    cr.status,
    cr.priority,
    cr.created_at,
    cr.resolved_at,
    COUNT(rs.student_id) AS support_count

FROM community_requests cr

LEFT JOIN request_supports rs
    ON cr.id = rs.request_id

WHERE
    MONTH(cr.created_at) = MONTH(CURRENT_DATE())
    AND YEAR(cr.created_at) = YEAR(CURRENT_DATE())

GROUP BY
    cr.id,
    cr.title,
    cr.description,
    cr.category,
    cr.status,
    cr.priority,
    cr.created_at,
    cr.resolved_at

ORDER BY
    support_count DESC,
    cr.created_at DESC
";

$result = $conn->query($sql);

if (!$result) {

    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);

    exit();
}

$requests = [];

while ($row = $result->fetch_assoc()) {

    $requests[] = $row;

}

echo json_encode([
    "success" => true,
    "requests" => $requests
]);

$conn->close();

?>