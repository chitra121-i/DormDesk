<?php

include "../db.php";

header("Content-Type: application/json");

$sql = "

SELECT *
FROM notices
ORDER BY created_at DESC

";

$result = $conn->query($sql);

$notices = [];

while($row = $result->fetch_assoc()){

    $notices[] = $row;

}

echo json_encode([

    "success" => true,
    "notices" => $notices

]);

$conn->close();

?>