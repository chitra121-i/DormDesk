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

if (!$request_id) {

    echo json_encode([
        "success" => false,
        "message" => "Request ID is required"
    ]);

    exit();
}

/*
    Delete supports first because
    request_supports contains request_id.
*/

$delete_supports = $conn->prepare(
    "DELETE FROM request_supports WHERE request_id = ?"
);

$delete_supports->bind_param(
    "i",
    $request_id
);

$delete_supports->execute();

$delete_request = $conn->prepare(
    "DELETE FROM community_requests WHERE id = ?"
);

$delete_request->bind_param(
    "i",
    $request_id
);

if ($delete_request->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Request deleted successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete request"
    ]);

}

$conn->close();

?>