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

$rule_text = trim(
    $data["rule_text"] ?? ""
);

if (!$id || $rule_text === "") {

    echo json_encode([
        "success" => false,
        "message" => "Rule ID and text are required."
    ]);

    exit();
}

$sql = "
    UPDATE hostel_rules

    SET rule_text = ?

    WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "si",
    $rule_text,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Rule updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update rule."
    ]);

}

$stmt->close();
$conn->close();

?>