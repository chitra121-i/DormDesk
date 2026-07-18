<?php

include "../db.php";

$sql = "
SELECT *
FROM students
WHERE status != 'alumni'
ORDER BY name ASC
";

$result = $conn->query($sql);

$students = [];

while($row = $result->fetch_assoc()){

    $students[] = $row;
}

echo json_encode([
    "success" => true,
    "students" => $students
]);

$conn->close();

?>