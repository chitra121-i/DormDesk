<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT

c.id,
c.student_id,
c.category,
c.description,
c.status,
c.reply,
c.created_at,

s.name AS student_name,
s.room_no

FROM complaints c

INNER JOIN students s
ON c.student_id = s.id

ORDER BY c.created_at DESC

";

$result = $conn->query($sql);

$complaints = [];

while($row = $result->fetch_assoc()){

    $complaints[] = $row;

}

echo json_encode([
    "success" => true,
    "complaints" => $complaints
]);

$conn->close();

?>