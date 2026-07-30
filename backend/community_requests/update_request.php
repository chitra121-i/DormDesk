<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

include "../db.php";
include "../helpers/activity_helper.php";

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

/* Fetch request details for activity logs */

$result = $conn->prepare("
SELECT created_by, title
FROM community_requests
WHERE id = ?
");

$result->bind_param("i", $request_id);
$result->execute();

$request = $result->get_result()->fetch_assoc();

$student_id = $request["created_by"];
$title = $request["title"];

/*
    If request is marked Resolved,
    store current timestamp.

    Otherwise remove resolved timestamp.
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

    // Warden Activity

    logWardenActivity(
        $conn,
        "Community Request Updated",
        "Updated \"$title\" to $status ($priority Priority).",
        "green"
    );

    // Student Activity

    logStudentActivity(
        $conn,
        $student_id,
        "Community Request Updated",
        "Your request \"$title\" has been marked as '$status' with '$priority' priority.",
        "green"
    );

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