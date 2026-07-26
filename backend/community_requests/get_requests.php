<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

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
    s.name AS created_by,
    COUNT(rs.student_id) AS support_count

FROM community_requests cr

LEFT JOIN students s
ON cr.created_by = s.id

LEFT JOIN request_supports rs
ON cr.id = rs.request_id

GROUP BY cr.id

ORDER BY cr.created_at DESC
";

$result = $conn->query($sql);

$requests = [];

while($row = $result->fetch_assoc()){

    $requests[] = $row;

}

echo json_encode([
    "success" => true,
    "requests" => $requests
]);

$conn->close();

?>