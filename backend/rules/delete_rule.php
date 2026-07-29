<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include "../db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $data["id"] ?? null;

if (!$id) {

    echo json_encode([
        "success" => false,
        "message" => "Rule ID is required."
    ]);

    exit();
}

$sql = "
    DELETE FROM hostel_rules

    WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Rule deleted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete rule."
    ]);

}

$stmt->close();
$conn->close();

?>
