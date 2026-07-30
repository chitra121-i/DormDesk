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

$result = $conn->prepare("
SELECT created_by,title
FROM community_requests
WHERE id=?
");

$result->bind_param("i",$request_id);
$result->execute();

$request = $result->get_result()->fetch_assoc();

$student_id = $request["created_by"];
$title = $request["title"];

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

    logStudentActivity(
        $conn,
        $student_id,
        "Community Request Deleted",
        "Your request \"$title\" has been deleted.",
        "red"
    );

    logWardenActivity(
        $conn,
        "Community Request Deleted",
        "Deleted community request \"$title\".",
        "red"
    );

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