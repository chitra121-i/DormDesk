<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

include "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$request_id = $data["request_id"] ?? null;
$status = $data["status"] ?? null;
$priority = $data["priority"] ?? null;

if (!$request_id || !$status || !$priority) {

    echo json_encode([
        "success" => false,
        "message" => "Missing required fields"
    ]);

    exit();
}

/*
    If request is marked Resolved,
    store current timestamp.

    If changed back to Pending,
    remove resolved timestamp.
*/

if ($status === "Resolved") {

    $sql = "
    UPDATE community_requests

    SET
        status = ?,
        priority = ?,
        resolved_at = CURRENT_TIMESTAMP

    WHERE id = ?
    ";

} else {

    $sql = "
    UPDATE community_requests

    SET
        status = ?,
        priority = ?,
        resolved_at = NULL

    WHERE id = ?
    ";

}

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssi",
    $status,
    $priority,
    $request_id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Request updated successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update request"
    ]);

}

$stmt->close();
$conn->close();

?>