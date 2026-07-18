<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT

g.*,

s.name AS student_name,
s.roll_no,
s.room_no

FROM gatepasses g

INNER JOIN students s
ON g.student_id = s.id

ORDER BY g.created_at DESC

";

$result = $conn->query($sql);

$gatepasses = [];

while($row = $result->fetch_assoc()){

    $gatepasses[] = $row;

}

echo json_encode([

    "success" => true,
    "gatepasses" => $gatepasses

]);

$conn->close();

?>